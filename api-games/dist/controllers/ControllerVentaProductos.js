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
exports.detallVenta = exports.ventasPorSucursal = exports.ventasPorCliente = exports.productosPorVenta = void 0;
const VentaProducto_1 = __importDefault(require("../models/VentaProducto"));
const Coneccion_1 = __importDefault(require("../data/Coneccion"));
const sequelize_1 = require("sequelize");
const productosPorVenta = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigoVenta } = request.params;
        const productos = yield VentaProducto_1.default.findAll({
            where: {
                codigo_venta: codigoVenta
            },
        });
        response.json(productos);
    }
    catch (error) {
        console.log("Imprimiendo error:\n", error);
        response.status(500).json({ error: `${error}` });
    }
});
exports.productosPorVenta = productosPorVenta;
const ventasPorCliente = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nitCliente } = request.params;
        const query = `
      SELECT * FROM venta.ventas_cliente(:nitCliente);
    `;
        const ventas = yield Coneccion_1.default.query(query, {
            replacements: { nitCliente: nitCliente },
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(ventas);
    }
    catch (error) {
        response.status(500).json({ error: `${error}` });
    }
});
exports.ventasPorCliente = ventasPorCliente;
const ventasPorSucursal = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigoSucursal } = request.params;
        const query = `
      SELECT * FROM venta.ventas_sucursal(:codigoSucursal);
    `;
        const ventas = yield Coneccion_1.default.query(query, {
            replacements: { codigoSucursal: codigoSucursal },
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(ventas);
    }
    catch (error) {
        response.status(500).json({ error: `${error}` });
    }
});
exports.ventasPorSucursal = ventasPorSucursal;
const detallVenta = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigoVenta } = request.params;
        const query = `
      SELECT * FROM venta.detalle_venta(:codigoVenta);
    `;
        const productos = yield Coneccion_1.default.query(query, {
            replacements: { codigoVenta: codigoVenta },
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(productos);
    }
    catch (error) {
        response.status(500).json({ message: "error: " + `${error}` });
    }
});
exports.detallVenta = detallVenta;
