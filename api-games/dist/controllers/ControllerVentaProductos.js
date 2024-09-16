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
exports.productosPorVenta = void 0;
const VentaProducto_1 = __importDefault(require("../models/VentaProducto"));
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
