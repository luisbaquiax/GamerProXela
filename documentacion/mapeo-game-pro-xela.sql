drop database games;
create database games;
\c games;

CREATE SCHEMA usuario;
CREATE SCHEMA producto;
CREATE SCHEMA scursal;

create table if not exists usuusers(
    username    CHARACTER VARYING(45)  NOT NULL,
    password    CHARACTER VARYING(100) NOT NULL,
    tipo        CHARACTER VARYING(10)  NOT NULL,
    estado      CHARACTER VARYING(10)  NOT NULL,
    PRIMARY KEY(username)
);

create table if not exists clientes(
    nit VARCHAR(8)      PRIMARY KEY NOT NULL,
    nombre VARCHAR(45)  NOT NULL
);

create table if not exists productos(
    codigo SERIAL   PRIMARY KEY             NOT NULL,
    nombre          CHARACTER VARYING(45)   NOT NULL,
    precio          DOUBLE PRECISION        NOT NULL
);

create table if not exists sucursales(
    codigo SERIAL PRIMARY KEY   NOT NULL,
    nombre VARCHAR(45)          NOT NULL
);

create table if not exists sucursal_usuarios(
    username_usuario CHARACTER VARYING(45)  NOT NULL,
    codigo_sucursal  INTEGER                NOT NULL,
    PRIMARY KEY(username_usuario, codigo_sucursal),
    FOREIGN KEY(username_usuario) REFERENCES users(username),
    FOREIGN KEY(codigo_sucursal) REFERENCES sucursales(codigo)
);

create table if not exists bodegas(
    codigo SERIAL       PRIMARY KEY             NOT NULL,
    nombre              CHARACTER VARYING(45)   NOT NULL,
    codigo_sucursal     INTEGER                 NOT NULL,
    username_usuario    CHARACTER VARYING(45)   NOT NULL UNIQUE,
    FOREIGN KEY(codigo_sucursal) REFERENCES sucursales(codigo),
    FOREIGN KEY(username_usuario) REFERENCES users(username)
);

create table if not exists bodega_productos(
    codigo_bodega   INTEGER NOT NULL,
    codigo_producto INTEGER NOT NULL,
    cantidad        INT NOT NULL,
    PRIMARY KEY(codigo_bodega, codigo_producto),
    FOREIGN KEY(codigo_bodega) REFERENCES bodegas(codigo),
    FOREIGN KEY(codigo_producto) REFERENCES productos(codigo)
);

create table if not exists sucursal_productos(
    codigo_sucursal INTEGER NOT NULL,
    codigo_producto INTEGER NOT NULL,
    cantidad        INT NOT NULL,
    pasillo         INT NOT NULL,
    PRIMARY KEY(codigo_sucursal, codigo_producto),
    FOREIGN KEY(codigo_sucursal) REFERENCES sucursales(codigo),
    FOREIGN KEY(codigo_producto) REFERENCES productos(codigo)
);

create table if not exists ventas(
    codigo SERIAL       NOT NULL,
    nit_cliente         CHARACTER VARYING(8)    NOT NULL,
    username_usuario    CHARACTER VARYING(45)   NOT NULL,
    fecha               DATE                    NOT NULL,
    total               DOUBLE PRECISION        NOT NULL,
    total_descuento     DOUBLE PRECISION        NOT NULL,
    codigo_sucursal     INTEGER                 NOT NULL,
    PRIMARY KEY(codigo),
    FOREIGN KEY(nit_cliente) REFERENCES clientes(nit),
    FOREIGN KEY(username_usuario) REFERENCES users(username),
    FOREIGN KEY(codigo_sucursal) REFERENCES sucursales(codigo)
);

create table if not exists productos_ventas(
    codigo_venta    INTEGER             NOT NULL,
    codigo_producto INTEGER             NOT NULL,
    precio_unitario DOUBLE PRECISION    NOT NULL,
    cantidad        INT                 NOT NULL,
    PRIMARY KEY(codigo_venta, codigo_producto),
    FOREIGN KEY(codigo_venta) REFERENCES ventas(codigo),
    FOREIGN KEY(codigo_producto) REFERENCES productos(codigo)
);
