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
exports.getVentas = exports.getVentasPorSucursal = exports.createVenta = void 0;
const Venta_1 = __importDefault(require("../models/Venta"));
const createVenta = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = request;
        yield Venta_1.default.create(body);
        response.json({ message: "Venta creada exitosamente." });
    }
    catch (error) {
        response.status(500).json({ message: `${error}` });
    }
});
exports.createVenta = createVenta;
const getVentasPorSucursal = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigoSucursal } = request.params;
        const ventas = yield Venta_1.default.findAll({
            where: {
                codigo_sucursal: codigoSucursal
            },
        });
        response.json(ventas);
    }
    catch (error) {
        response.status(500).json({ message: `${error}` });
    }
});
exports.getVentasPorSucursal = getVentasPorSucursal;
// SELECT * FROM venta.ventas ORDER BY codigo DESC; 
const getVentas = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = yield Venta_1.default.findAll({
            order: [
                ['codigo', 'DESC'],
            ],
        });
        response.json(ventas);
    }
    catch (error) {
        response.status(500).json({ message: `Error en el servidor, ${error}` });
    }
});
exports.getVentas = getVentas;
