-- Ventas para la sucursal 'Parque' (Código 1)
INSERT INTO ventas (nit_cliente, username_usuario, fecha, total, total_descuento, codigo_sucursal) VALUES
('12345678', 'cajero1', '2024-08-16', 500.00, 450.00, 1),
('87654321', 'cajero2', '2024-08-17', 750.00, 675.00, 1),
('12345679', 'cajero3', '2024-08-18', 620.00, 558.00, 1),
('87654322', 'cajero4', '2024-08-19', 300.00, 270.00, 1),
('12345680', 'cajero5', '2024-08-20', 810.00, 729.00, 1),
('87654323', 'cajero6', '2024-08-21', 450.00, 405.00, 1),
('12345681', 'cajero1', '2024-08-22', 620.00, 558.00, 1),
('87654324', 'cajero2', '2024-08-23', 700.00, 630.00, 1),
('12345682', 'cajero3', '2024-08-24', 550.00, 495.00, 1),
('87654325', 'cajero4', '2024-08-25', 400.00, 360.00, 1);


-- Productos para cada venta en la sucursal 'Parque'
INSERT INTO productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad) VALUES
(1, 1, 50.00, 1), (1, 2, 20.00, 1), (1, 3, 80.00, 1),
(2, 4, 100.00, 1), (2, 5, 50.00, 1), (2, 6, 50.00, 2),
(3, 7, 60.00, 1), (3, 8, 60.00, 2),
(4, 9, 120.00, 1), (4, 10, 100.00, 1),
(5, 11, 70.00, 1), (5, 12, 100.00, 1),
(6, 13, 70.00, 2), (6, 14, 70.00, 1),
(7, 15, 80.00, 1), (7, 16, 50.00, 1),
(8, 17, 80.00, 2), (8, 18, 40.00, 1),
(9, 19, 60.00, 2), (9, 20, 70.00, 1),
(10, 21, 90.00, 2), (10, 22, 50.00, 1);

-- Ventas para la sucursal 'Centro1' (Código 2)
INSERT INTO ventas (nit_cliente, username_usuario, fecha, total, total_descuento, codigo_sucursal) VALUES
('12345683', 'cajero7', '2024-08-16', 500.00, 450.00, 2),
('87654326', 'cajero8', '2024-08-17', 750.00, 675.00, 2),
('12345684', 'cajero9', '2024-08-18', 620.00, 558.00, 2),
('87654327', 'cajero10', '2024-08-19', 300.00, 270.00, 2),
('12345685', 'cajero11', '2024-08-20', 810.00, 729.00, 2),
('87654328', 'cajero12', '2024-08-21', 450.00, 405.00, 2),
('12345686', 'cajero7', '2024-08-22', 620.00, 558.00, 2),
('87654329', 'cajero8', '2024-08-23', 700.00, 630.00, 2),
('12345687', 'cajero9', '2024-08-24', 550.00, 495.00, 2),
('87654330', 'cajero10', '2024-08-25', 400.00, 360.00, 2);

-- Productos para cada venta en la sucursal 'Centro1'
INSERT INTO productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad) VALUES
(11, 23, 100.00, 1), (11, 24, 50.00, 2),
(12, 25, 110.00, 1), (12, 26, 100.00, 1),
(13, 27, 60.00, 2), (13, 28, 70.00, 1),
(14, 29, 140.00, 1), (14, 30, 80.00, 2),
(15, 31, 130.00, 2), (15, 32, 100.00, 1),
(16, 33, 140.00, 1), (16, 34, 90.00, 2),
(17, 35, 120.00, 2), (17, 36, 120.00, 1),
(18, 37, 90.00, 2), (18, 38, 170.00, 1),
(19, 39, 150.00, 2), (19, 40, 140.00, 1),
(20, 41, 120.00, 2), (20, 42, 110.00, 1);

-- Ventas para la sucursal 'Centro2' (Código 3)
INSERT INTO ventas (nit_cliente, username_usuario, fecha, total, total_descuento, codigo_sucursal) VALUES
('12345688', 'cajero13', '2024-08-16', 500.00, 450.00, 3),
('87654331', 'cajero14', '2024-08-17', 750.00, 675.00, 3),
('12345689', 'cajero15', '2024-08-18', 620.00, 558.00, 3),
('87654332', 'cajero16', '2024-08-19', 300.00, 270.00, 3),
('12345690', 'cajero17', '2024-08-20', 810.00, 729.00, 3),
('87654333', 'cajero18', '2024-08-21', 450.00, 405.00, 3),
('12345691', 'cajero13', '2024-08-22', 620.00, 558.00, 3),
('87654334', 'cajero14', '2024-08-23', 700.00, 630.00, 3),
('12345692', 'cajero15', '2024-08-24', 550.00, 495.00, 3),
('87654335', 'cajero16', '2024-08-25', 400.00, 360.00, 3);


-- Productos para cada venta en la sucursal 'Centro2'
INSERT INTO productos_ventas (codigo_venta, codigo_producto, precio_unitario, cantidad) VALUES
(21, 43, 50.00, 2), (21, 44, 40.00, 2),
(22, 45, 70.00, 1), (22, 46, 50.00, 2),
(23, 47, 60.00, 1), (23, 48, 70.00, 2),
(24, 49, 70.00, 2), (24, 50, 50.00, 2),
(25, 51, 90.00, 2), (25, 52, 80.00, 1),
(26, 53, 110.00, 1), (26, 54, 100.00, 2),
(27, 55, 120.00, 2), (27, 56, 90.00, 1),
(28, 57, 140.00, 2), (28, 58, 80.00, 1),
(29, 59, 110.00, 2), (29, 60, 130.00, 1),
(30, 61, 120.00, 2), (30, 62, 100.00, 1);
