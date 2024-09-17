"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const coneccion = new sequelize_1.Sequelize("games2", "postgres", "luisbaquiax@1234", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
});
exports.default = coneccion;
