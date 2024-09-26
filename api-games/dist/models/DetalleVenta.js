"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coneccion_1 = __importDefault(require("../data/Coneccion"));
const sequelize_1 = require("sequelize");
const DetallVentaDb = Coneccion_1.default.define("venta", {
    codigo_venta: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
    },
    codigo_producto: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
    },
    precio_unitario: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    cantidad: {
        type: sequelize_1.DataTypes.NUMBER,
    }
}, {
    tableName: "productos_ventas",
    schema: "venta",
    createdAt: false,
    updatedAt: false,
});
exports.default = DetallVentaDb;
