"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coneccion_1 = __importDefault(require("../../data/Coneccion"));
const sequelize_1 = require("sequelize");
const TarjetaDB = Coneccion_1.default.define("tarjetas", {
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    nit_cliente: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
    },
    fecha_activacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    puntos: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    tableName: "tarjetas",
    schema: "usuario",
    createdAt: false,
    updatedAt: false,
});
exports.default = TarjetaDB;
