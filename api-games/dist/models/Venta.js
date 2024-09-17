"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coneccion_1 = __importDefault(require("../data/Coneccion"));
const sequelize_1 = require("sequelize");
const VentaDB = Coneccion_1.default.define("venta", {
    codigo: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
    },
    nit_cliente: {
        type: sequelize_1.DataTypes.STRING,
    },
    username_usuario: {
        type: sequelize_1.DataTypes.STRING,
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING,
    },
    total: {
        type: sequelize_1.DataTypes.NUMBER
    },
    descuento: {
        type: sequelize_1.DataTypes.NUMBER
    },
    codigo_sucursal: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    tableName: "ventas",
    schema: "venta",
    createdAt: false,
    updatedAt: false,
});
exports.default = VentaDB;
