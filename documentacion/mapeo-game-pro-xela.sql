drop database games2;
create database games2;
\c games2;

CREATE SCHEMA usuario;
CREATE SCHEMA producto;
CREATE SCHEMA sucursal;
CREATE SCHEMA bodega;
CREATE SCHEMA venta;

CREATE TABLE IF NOT EXISTS usuario.users(
    username    CHARACTER VARYING(45)  NOT NULL,
    password    CHARACTER VARYING(100) NOT NULL,
    tipo        CHARACTER VARYING(10)  NOT NULL,
    estado      CHARACTER VARYING(15)  NOT NULL,
    PRIMARY KEY(username)
);

CREATE TABLE IF NOT EXISTS usuario.clientes(
    nit     CHARACTER VARYING(8)       PRIMARY KEY NOT NULL,
    nombre  CHARACTER VARYING(45)       NOT NULL,
    estado  CHARACTER VARYING(15)
);

CREATE TABLE IF NOT EXISTS producto.productos(
    codigo SERIAL   PRIMARY KEY             NOT NULL,
    nombre          UNIQUE CHARACTER VARYING(45)   NOT NULL,
    precio          DOUBLE PRECISION        NOT NULL
);

CREATE TABLE IF NOT EXISTS sucursal.sucursales(
    codigo SERIAL PRIMARY KEY       NOT NULL,
    nombre CHARACTER VARYING(45)    NOT NULL
);

CREATE TABLE IF NOT EXISTS sucursal.sucursal_usuarios(
    username_usuario CHARACTER VARYING(45)  NOT NULL,
    codigo_sucursal  INTEGER                NOT NULL,
    PRIMARY KEY(username_usuario, codigo_sucursal),
    FOREIGN KEY(username_usuario) REFERENCES usuario.users(username),
    FOREIGN KEY(codigo_sucursal) REFERENCES sucursal.sucursales(codigo)
);

CREATE TABLE IF NOT EXISTS sucursal.cajas(
    numero              INT NOT NULL,
    codigo_sucursal     INT NOT NULL,
    username_usuario    CHARACTER VARYING(45) UNIQUE,
    PRIMARY KEY(numero, codigo_sucursal),
    FOREIGN KEY(codigo_sucursal) REFERENCES sucursal.sucursales(codigo),
    FOREIGN KEY(username_usuario) REFERENCES usuario.users(username)
);

CREATE TABLE IF NOT EXISTS sucursal.sucursal_productos(
    codigo_sucursal INTEGER NOT NULL,
    codigo_producto INTEGER NOT NULL,
    cantidad        INT NOT NULL,
    pasillo         INT NOT NULL,
    PRIMARY KEY(codigo_sucursal, codigo_producto),
    FOREIGN KEY(codigo_sucursal) REFERENCES sucursal.sucursales(codigo),
    FOREIGN KEY(codigo_producto) REFERENCES producto.productos(codigo)
);

CREATE TABLE IF NOT EXISTS bodega.bodegas(
    codigo SERIAL       PRIMARY KEY             NOT NULL,
    nombre              CHARACTER VARYING(45)   NOT NULL,
    codigo_sucursal     INTEGER                 NOT NULL,
    username_usuario    CHARACTER VARYING(45)   NOT NULL UNIQUE,
    FOREIGN KEY(codigo_sucursal) REFERENCES sucursal.sucursales(codigo),
    FOREIGN KEY(username_usuario) REFERENCES usuario.users(username)
);

CREATE TABLE IF NOT EXISTS bodega.bodega_productos(
    codigo_bodega   INTEGER NOT NULL,
    codigo_producto INTEGER NOT NULL,
    cantidad        INT NOT NULL,
    PRIMARY KEY(codigo_bodega, codigo_producto),
    FOREIGN KEY(codigo_bodega) REFERENCES bodega.bodegas(codigo),
    FOREIGN KEY(codigo_producto) REFERENCES producto.productos(codigo)
);

/*
Venta de productos
*/
CREATE TABLE IF NOT EXISTS venta.ventas(
    codigo SERIAL       NOT NULL,
    nit_cliente         CHARACTER VARYING(8)    NOT NULL,
    username_usuario    CHARACTER VARYING(45)   NOT NULL,
    fecha               DATE                    NOT NULL,
    total               DOUBLE PRECISION        NOT NULL,
    descuento           DOUBLE PRECISION        NOT NULL,
    codigo_sucursal     INTEGER                 NOT NULL,
    PRIMARY KEY(codigo),
    FOREIGN KEY(nit_cliente) REFERENCES usuario.clientes(nit),
    FOREIGN KEY(username_usuario) REFERENCES usuario.users(username),
    FOREIGN KEY(codigo_sucursal) REFERENCES sucursal.sucursales(codigo)
);

/*
Detalle de la venta
*/
CREATE TABLE IF NOT EXISTS venta.productos_ventas(
    codigo_venta    INTEGER             NOT NULL,
    codigo_producto INTEGER             NOT NULL,
    precio_unitario DOUBLE PRECISION    NOT NULL,
    cantidad        INT                 NOT NULL,
    PRIMARY KEY(codigo_venta, codigo_producto),
    FOREIGN KEY(codigo_venta) REFERENCES venta.ventas(codigo),
    FOREIGN KEY(codigo_producto) REFERENCES producto.productos(codigo)
);
