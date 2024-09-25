"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coneccion_1 = __importDefault(require("../../data/Coneccion"));
const sequelize_1 = require("sequelize");
const SucursalesDb = Coneccion_1.default.define("sucursales", {
    codigo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: "sucursales",
    schema: "sucursal",
    createdAt: false,
    updatedAt: false,
});
exports.default = SucursalesDb;
