"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coneccion_1 = __importDefault(require("../../../data/Coneccion"));
const sequelize_1 = require("sequelize");
const BodegaProductosDB = Coneccion_1.default.define("sucursal_productos", {
    codigo_sucursal: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    codigo_producto: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    cantidad: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    pasillo: {
        type: sequelize_1.DataTypes.NUMBER,
    }
}, {
    tableName: "sucursal_productos",
    schema: "sucursal",
    createdAt: false,
    updatedAt: false,
});
exports.default = BodegaProductosDB;
