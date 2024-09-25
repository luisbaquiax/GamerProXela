"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coneccion_1 = __importDefault(require("../../data/Coneccion"));
const sequelize_1 = require("sequelize");
const SucursalModel = Coneccion_1.default.define("sucursal_usuarios", {
    username_usuario: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    codigo_sucursal: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
}, {
    tableName: "sucursal_usuarios",
    schema: "sucursal",
    createdAt: false,
    updatedAt: false,
});
exports.default = SucursalModel;
