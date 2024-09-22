"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coneccion_1 = __importDefault(require("../data/Coneccion"));
const sequelize_1 = require("sequelize");
const ProductoDb = Coneccion_1.default.define("productos", {
    codigo: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    precio: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: "productos",
    schema: "producto",
    createdAt: false,
    updatedAt: false,
});
exports.default = ProductoDb;
