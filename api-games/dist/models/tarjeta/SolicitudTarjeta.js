"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coneccion_1 = __importDefault(require("../../data/Coneccion"));
const sequelize_1 = require("sequelize");
const SolicitudTarjetaDB = Coneccion_1.default.define("solicitud_tarjeta", {
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
    estado: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    tableName: "solicitud_tarjeta",
    schema: "usuario",
    createdAt: false,
    updatedAt: false,
});
exports.default = SolicitudTarjetaDB;
