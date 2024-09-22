"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Coneccion_1 = __importDefault(require("../../data/Coneccion"));
const BodegaProductosDb = Coneccion_1.default.define("productos", {
    codigo_bodega: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
    },
    codigo_producto: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
    },
    cantidad: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    tableName: "bodega_productos",
    schema: "bodega",
    createdAt: false,
    updatedAt: false,
});
exports.default = BodegaProductosDb;
