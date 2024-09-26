-- selecciona los productos por sucursal y por cajero1

	-- query
SELECT p.codigo_sucursal, p.codigo_producto, p.cantidad, p.pasillo
FROM sucursal.sucursal_productos p
INNER JOIN sucursal.sucursal_usuarios u ON u.codigo_sucursal = p.codigo_sucursal
WHERE u.username_usuario = 'cajero1';

SELECT p.codigo_sucursal, p.codigo_producto, p.cantidad, p.pasillo, ps.nombre as producto, ps.precio
FROM sucursal.sucursal_productos p
INNER JOIN sucursal.sucursal_usuarios u ON u.codigo_sucursal = p.codigo_sucursal
INNER JOIN producto.productos ps ON p.codigo_producto = ps.codigo
INNER JOIN sucursal.sucursales sc ON sc.codigo = p.codigo_sucursal
WHERE u.username_usuario = 'cajero1';

	--FUNCTION
CREATE OR REPLACE FUNCTION sucursal.get_sucursal_productos(username CHARACTER VARYING(45))
RETURNS TABLE(codigo_sucursal INT, codigo_producto INT, cantidad INT, pasillo INT, producto CHARACTER VARYING(45), precio DOUBLE PRECISION) AS $$
BEGIN
	RETURN QUERY
		SELECT p.codigo_sucursal, p.codigo_producto, p.cantidad, p.pasillo, ps.nombre as producto, ps.precio
		FROM sucursal.sucursal_productos p
		INNER JOIN sucursal.sucursal_usuarios u ON u.codigo_sucursal = p.codigo_sucursal
		INNER JOIN producto.productos ps ON p.codigo_producto = ps.codigo
		INNER JOIN sucursal.sucursales sc ON sc.codigo = p.codigo_sucursal
		WHERE u.username_usuario = username ORDER BY ps.codigo ASC;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM sucursal.get_sucursal_productos('cajero1');

-- productos en bodega para mostrar al de inventario
	--query
SELECT p.codigo, p.nombre, p.precio, b.cantidad, b.codigo_bodega as bodega
FROM producto.productos p
INNER JOIN bodega.bodega_productos b ON p.codigo = b.codigo_producto
INNER JOIN bodega.bodegas bo ON b.codigo_bodega = bo.codigo
WHERE bo.codigo_sucursal = 1;

	-- FUNCTION
CREATE OR REPLACE FUNCTION bodega.get_productos_inventario(sucursal INT)
RETURNS TABLE(codigo INT, nombre CHARACTER VARYING(45), precio DOUBLE PRECISION, cantidad INT, bodega INT) AS $$
BEGIN
	RETURN QUERY
		SELECT p.codigo, p.nombre, p.precio, b.cantidad, b.codigo_bodega as bodega
		FROM producto.productos p
		INNER JOIN bodega.bodega_productos b ON p.codigo = b.codigo_producto
		INNER JOIN bodega.bodegas bo ON b.codigo_bodega = bo.codigo
		WHERE bo.codigo_sucursal = sucursal ORDER BY p.codigo ASC;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM bodega.get_productos_inventario(1);

	-- producto en estatenrias
	-- query


-- selecciona los productos en una bodega - inventario
	-- QUERY
SELECT p.codigo, p.nombre, p.precio, b.cantidad, b.codigo_bodega as bodega
FROM producto.productos p
INNER JOIN bodega.bodega_productos b ON p.codigo = b.codigo_producto
INNER JOIN bodega.bodegas bo ON b.codigo_bodega = bo.codigo
WHERE bo.username_usuario = 'bodega1';

	-- FUNCTION

CREATE OR REPLACE FUNCTION bodega.get_bodega_productos(username CHARACTER VARYING(45))
RETURNS TABLE(codigo INT, nombre CHARACTER VARYING(45), precio DOUBLE PRECISION, cantidad INT, bodega INT) AS $$
BEGIN
    RETURN QUERY
		SELECT p.codigo, p.nombre, p.precio, b.cantidad, b.codigo_bodega as bodega
		FROM producto.productos p
		INNER JOIN bodega.bodega_productos b ON p.codigo = b.codigo_producto
		INNER JOIN bodega.bodegas bo ON b.codigo_bodega = bo.codigo
		WHERE bo.username_usuario = username ORDER BY p.codigo ASC;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM bodega.get_bodega_productos('bodega1');

-- REPORTES

-- ( historial descuentos ) REPORTE: historial de descuentos realizado en un intervalo de tiempo
CREATE OR REPLACE FUNCTION venta.historial_descuento(fecha1 DATE, fecha2 DATE)
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
		WHERE v.fecha BETWEEN fecha1 AND fecha2 AND v.descuento > 0
		ORDER BY v.total DESC;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM venta.historial_descuento('2024-01-01', '2024-12-31');


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


	-- detalle de cada venta
		--QUERY
SELECT d.codigo_venta, d.codigo_producto, d.precio_unitario, d.cantidad, p.nombre
FROM venta.productos_ventas d
INNER JOIN venta.ventas v ON v.codigo = d.codigo_venta
INNER JOIN producto.productos p ON d.codigo_producto = p.codigo
WHERE V.codigo = 1;
		--FUNCTION
CREATE OR REPLACE FUNCTION venta.detalle_venta(v_codigo INT)
RETURNS TABLE(venta INT, producto INT, precio DOUBLE PRECISION, cantidad INT, nombre CHARACTER VARYING(45)) AS $$
BEGIN
	RETURN QUERY
		SELECT d.codigo_venta, d.codigo_producto, d.precio_unitario, d.cantidad, p.nombre
		FROM venta.productos_ventas d
		INNER JOIN venta.ventas v ON v.codigo = d.codigo_venta
		INNER JOIN producto.productos p ON d.codigo_producto = p.codigo
		WHERE V.codigo = v_codigo;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM venta.detalle_venta(1);

	-- ventas por cliente
CREATE OR REPLACE FUNCTION venta.ventas_cliente(nit CHARACTER VARYING(8))
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
		WHERE v.nit_cliente = nit
		ORDER BY v.codigo DESC;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM venta.ventas_cliente('12345678');

	-- ventas por sucursal
CREATE OR REPLACE FUNCTION venta.ventas_sucursal(id INT)
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
		WHERE s.codigo = id
		ORDER BY v.codigo DESC;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM venta.ventas_sucursal(1);

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

-- actualizar productos en sucursal en el momento de realizar una venta
CREATE OR REPLACE FUNCTION venta.update_sucursal_productos()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE sucursal.sucursal_productos
    SET cantidad = cantidad - NEW.cantidad
    WHERE codigo_sucursal = (
        SELECT codigo_sucursal
        FROM venta.ventas
        WHERE codigo = NEW.codigo_venta
    )
    AND codigo_producto = NEW.codigo_producto;

    IF (SELECT cantidad FROM sucursal.sucursal_productos
        WHERE codigo_sucursal = (
            SELECT codigo_sucursal
            FROM venta.ventas
            WHERE codigo = NEW.codigo_venta
        )
        AND codigo_producto = NEW.codigo_producto) < 0 THEN
        RAISE EXCEPTION 'No hay suficiente unidades de productos en la sucursal';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sucursal_productos_trigger
AFTER INSERT ON venta.productos_ventas
FOR EACH ROW
EXECUTE FUNCTION venta.update_sucursal_productos();
