-- selecciona los productos por sucursal y por cajero1

SELECT p.codigo_sucursal, p.codigo_producto, p.cantidad, p.pasillo
FROM sucursal.sucursal_productos p
INNER JOIN sucursal.sucursal_usuarios u ON u.codigo_sucursal = p.codigo_sucursal
WHERE u.username_usuario = 'cajero1';

-- version mejorada en forma de FUNCTION

CREATE OR REPLACE FUNCTION sucursal.get_sucursal_productos(username CHARACTER VARYING(45))
RETURNS TABLE(codigo_sucursal INT, codigo_producto INT, cantidad INT, pasillo INT) AS $$
BEGIN
	RETURN QUERY
		SELECT p.codigo_sucursal, p.codigo_producto, p.cantidad, p.pasillo
		FROM sucursal.sucursal_productos p
		INNER JOIN sucursal.sucursal_usuarios u ON u.codigo_sucursal = p.codigo_sucursal
		WHERE u.username_usuario = username;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM sucursal.get_sucursal_productos('cajero1');


-- selecciona los productos en una bodega
SELECT p.codigo, p.nombre, p.precio
FROM producto.productos p
INNER JOIN bodega.bodega_productos b ON p.codigo = b.codigo_producto
INNER JOIN bodega.bodegas bo ON b.codigo_bodega = bo.codigo
WHERE bo.username_usuario = 'bodega1';

-- selecciona los productos de una bodega por usuario
-- formato FUNCTION

CREATE OR REPLACE FUNCTION bodega.get_bodega_productos(username CHARACTER VARYING(45))
RETURNS TABLE(codigo INT, nombre CHARACTER VARYING(45), precio DOUBLE PRECISION) AS $$
BEGIN
    RETURN QUERY
		SELECT p.codigo, p.nombre, p.precio
		FROM producto.productos p
		INNER JOIN bodega.bodega_productos b ON p.codigo = b.codigo_producto
		INNER JOIN bodega.bodegas bo ON b.codigo_bodega = bo.codigo
		WHERE bo.username_usuario = username;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM bodega.get_bodega_productos('bodega1');

-- REPORTES

-- ( historial descuentos ) REPORTE: historial de descuentos realizado en un intervalo de tiempo



-- ( 1 )  REPORTE: top 10 ventas más grandes en un intervalo de tiempo
	-- vista
 SELECT v.codigo AS venta_codigo,
    v.nit_cliente,
    v.username_usuario,
    v.fecha,
    v.total,
    v.descuento,
    s.nombre AS sucursal_nombre
   FROM venta.ventas v
     JOIN sucursal.sucursales s ON v.codigo_sucursal = s.codigo
  WHERE v.fecha >= '2024-01-01'::date AND v.fecha <= '2024-12-31'::date
  ORDER BY v.total DESC
 LIMIT 10;

	-- FUNCTION
CREATE OR REPLACE FUNCTION venta.top_10_ventas(fecha1 DATE, fecha2 DATE)
RETURNS TABLE(
				codigo INT,
				nit_cliente CHARACTER VARYING(8),
				username_usuario CHARACTER VARYING(45),
				fecha DATE,
				total DOUBLE PRECISION,
				descuento DOUBLE PRECISION,
				sucursal CHARACTER VARYING(45)
			) AS $$
BEGIN
	RETURN QUERY
		SELECT 	v.codigo,
				v.nit_cliente,
				v.username_usuario,
				v.fecha,
				v.total,
				v.descuento,
				s.nombre AS sucursal
		FROM venta.ventas v
		INNER JOIN sucursal.sucursales s ON s.codigo = v.codigo_sucursal
		WHERE v.fecha BETWEEN fecha1 AND fecha2
		ORDER BY v.total DESC
		LIMIT 10;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM venta.top_10_ventas('2024-01-01', '2024-12-31');

-- ( 2 ) REPORTE: top 2 sucursales que más ha generado dinero
	-- query
SELECT  SUM(v.total) as total, s.nombre, s.codigo
FROM venta.ventas v
INNER JOIN sucursal.sucursales s ON s.codigo = v.codigo_sucursal
GROUP BY s.nombre, s.codigo
ORDER BY total DESC
LIMIT 2;

	-- VIEW o VISTA

CREATE VIEW venta.top2_sucursales AS
	SELECT  SUM(v.total) as total, s.nombre, s.codigo
	FROM venta.ventas v
	INNER JOIN sucursal.sucursales s ON s.codigo = v.codigo_sucursal
	GROUP BY s.nombre, s.codigo
	ORDER BY total DESC
	LIMIT 2;

SELECT * FROM venta.top2_sucursales;

-- ( 3 )
	-- QUERY
SELECT SUM(d.cantidad) AS cantidad, p.nombre
FROM venta.productos_ventas d
INNER JOIN producto.productos p ON d.codigo_producto = p.codigo
GROUP BY p.nombre
ORDER BY cantidad DESC
LIMIT 10;

	-- VIEW o vista
CREATE VIEW venta.top10_articulos AS
	SELECT SUM(d.cantidad) AS cantidad, p.nombre
	FROM venta.productos_ventas d
	INNER JOIN producto.productos p ON d.codigo_producto = p.codigo
	GROUP BY p.nombre
	ORDER BY cantidad DESC
	LIMIT 10;

SELECT * FROM venta.top10_articulos;

-- ( 4 ) TOP CLIENTES QUE MÁS HAN GASTADO
	--QUERY
SELECT SUM(v.total - v.descuento), v.nit_cliente, c.nombre
FROM venta.ventas v
INNER JOIN usuario.clientes c ON c.nit = v.nit_cliente
GROUP BY v.nit_cliente, c.nombre
LIMIT 10;
	-- VIEW o VISTA
CREATE VIEW venta.top10_clientes AS
	SELECT SUM(v.total - v.descuento) gastado, v.nit_cliente, c.nombre
	FROM venta.ventas v
	INNER JOIN usuario.clientes c ON c.nit = v.nit_cliente
	GROUP BY v.nit_cliente, c.nombre
	ORDER BY gastado DESC
	LIMIT 10;

SELECT * FROM venta.top10_clientes;
