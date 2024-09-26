-- Actualizar el total de la venta
INSERT INTO venta.ventas (codigo, nit_cliente, username_usuario, fecha, total, descuento, codigo_sucursal) VALUES
(1, '12345678', 'cajero1', '2024-08-16', 577.50, 57.75, 1),
(2, '23456789', 'cajero2', '2024-08-17', 1078.00, 107.80, 1),
(3, '34567890', 'cajero3', '2024-08-18', 1578.50, 157.85, 1),
(4, '45678901', 'cajero4', '2024-08-19', 1963.50, 196.35, 1),
(5, '56789012', 'cajero5', '2024-08-20', 277.20, 27.72, 1),
(6, '67890123', 'cajero6', '2024-08-21', 554.40, 55.44, 1),
(7, '78901234', 'cajero1', '2024-08-22', 754.60, 75.46, 1),
(8, '89012345', 'cajero2', '2024-08-23', 693.00, 69.30, 1),
(9, '90123456', 'cajero3', '2024-08-24', 1093.40, 109.34, 1),
(10, '01234567', 'cajero4', '2024-08-25', 1309.00, 130.90, 1),
(11, '56689012', 'cajero7', '2024-08-26', 1462.80, 146.28, 2),
(12, '44890123', 'cajero8', '2024-08-27', 1663.20, 166.32, 2),
(13, '32901234', 'cajero9', '2024-08-28', 1386.00, 138.60, 2),
(14, '48012345', 'cajero10', '2024-08-29', 554.40, 55.44, 2),
(15, '96123456', 'cajero11', '2024-08-30', 1093.40, 109.34, 2),
(16, '23234567', 'cajero12', '2024-08-31', 1309.00, 130.90, 2),
(17, '12345678', 'cajero13', '2024-09-01', 1278.20, 127.82, 3),
(18, '23456789', 'cajero14', '2024-09-02', 1170.60, 117.06, 3),
(19, '34567890', 'cajero15', '2024-09-03', 1093.40, 109.34, 3),
(20, '45678901', 'cajero16', '2024-09-04', 1309.00, 130.90, 3),
(21, '56789012', 'cajero17', '2024-09-05', 1462.80, 146.28, 3),
(22, '67890123', 'cajero18', '2024-09-06', 1663.20, 166.32, 3);

-- Detalle de las ventas del 1 al 22
INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(1, 1, 115.5, 2),
(1, 2, 154, 1),
(1, 3, 192.5, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(2, 4, 231, 1),
(2, 5, 269.5, 2),
(2, 6, 308, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(3, 7, 346.5, 1),
(3, 8, 385, 1),
(3, 9, 423.5, 2);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(4, 10, 462, 2),
(4, 11, 500.5, 1),
(4, 12, 539, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(5, 13, 77, 1),
(5, 14, 92.4, 1),
(5, 15, 107.8, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(6, 16, 123.2, 1),
(6, 17, 138.6, 2),
(6, 18, 154, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(7, 19, 169.4, 1),
(7, 20, 184.8, 1),
(7, 21, 200.2, 2);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(8, 22, 215.6, 1),
(8, 23, 231, 1),
(8, 24, 246.4, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(9, 25, 261.8, 2),
(9, 26, 277.2, 1),
(9, 27, 292.6, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(10, 28, 308, 1),
(10, 29, 323.4, 1),
(10, 30, 338.8, 2);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(11, 31, 354.2, 1),
(11, 32, 369.6, 1),
(11, 33, 385, 2);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(12, 34, 400.4, 1),
(12, 35, 415.8, 2),
(12, 36, 431.2, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(13, 37, 446.6, 1),
(13, 38, 462, 1),
(13, 39, 477.4, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(14, 40, 492.8, 2),
(14, 41, 508.2, 1),
(14, 42, 523.6, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(15, 43, 539, 2),
(15, 44, 92.4, 1),
(15, 45, 107.8, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(16, 46, 123.2, 1),
(16, 47, 138.6, 2),
(16, 48, 154, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(17, 49, 169.4, 1),
(17, 50, 184.8, 1),
(17, 51, 200.2, 2);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(18, 52, 215.6, 1),
(18, 53, 231, 1),
(18, 54, 246.4, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(19, 55, 261.8, 2),
(19, 56, 277.2, 1),
(19, 57, 292.6, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(20, 58, 308, 1),
(20, 59, 323.4, 1),
(20, 60, 338.8, 2);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(21, 61, 354.2, 1),
(21, 62, 369.6, 2),
(21, 63, 385, 1);

INSERT INTO venta.productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad)
VALUES
(22, 64, 400.4, 1),
(22, 65, 415.8, 2),
(22, 66, 431.2, 1);


