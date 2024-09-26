"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historalDescuento = exports.getTop10Clientes = exports.getTop10Productos = exports.getTopSucursales = exports.getTop10Ventas = void 0;
const Coneccion_1 = __importDefault(require("../data/Coneccion"));
const sequelize_1 = require("sequelize");
const getTop10Ventas = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fecha1, fecha2 } = request.params;
        const query = `
      SELECT * FROM venta.top_10_ventas(:fecha1, :fecha2);
    `;
        const productos = yield Coneccion_1.default.query(query, {
            replacements: { fecha1: fecha1, fecha2: fecha2 },
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(productos);
    }
    catch (error) {
        response.status(500).json({ message: "error: " + `${error}` });
    }
});
exports.getTop10Ventas = getTop10Ventas;
const getTopSucursales = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM venta.top2_sucursales;`;
        const sucursales = yield Coneccion_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(sucursales);
    }
    catch (error) {
        response.status(500).json({ message: `${error}` });
    }
});
exports.getTopSucursales = getTopSucursales;
const getTop10Productos = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
            SELECT * FROM venta.top10_articulos;
        `;
        const productos = yield Coneccion_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(productos);
    }
    catch (error) {
        response.status(500).json({ message: `${error}` });
    }
});
exports.getTop10Productos = getTop10Productos;
const getTop10Clientes = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
            SELECT * FROM venta.top10_clientes;
        `;
        const clientes = yield Coneccion_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(clientes);
    }
    catch (error) {
        response.status(500).json({ message: `${error}` });
    }
});
exports.getTop10Clientes = getTop10Clientes;
const historalDescuento = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fecha1, fecha2 } = request.params;
        const query = `
          SELECT * FROM venta.historial_descuento(:fecha1, :fecha2);
        `;
        const productos = yield Coneccion_1.default.query(query, {
            replacements: { fecha1: fecha1, fecha2: fecha2 },
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(productos);
    }
    catch (error) {
        response.status(500).json({ message: "error: " + `${error}` });
    }
});
exports.historalDescuento = historalDescuento;
