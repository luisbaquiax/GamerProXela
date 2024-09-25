"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coneccion_1 = __importDefault(require("../data/Coneccion"));
const sequelize_1 = require("sequelize");
const ClienteDB = Coneccion_1.default.define("cliente", {
    nit: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: "clientes",
    schema: "usuario",
    createdAt: false,
    updatedAt: false,
});
exports.default = ClienteDB;
