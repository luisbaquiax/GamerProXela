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
exports.search = exports.updateProductoSucursal = exports.createProductoSucursal = exports.getSucursalProductos = void 0;
const Coneccion_1 = __importDefault(require("../data/Coneccion"));
const sequelize_1 = require("sequelize");
const SucursalProductosDB_1 = __importDefault(require("../models/sucursal/SucursalProductosDB"));
const getSucursalProductos = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = request.params;
        const query = `
       SELECT * FROM sucursal.get_sucursal_productos(:username);
    `;
        const productos = yield Coneccion_1.default.query(query, {
            replacements: { username: username },
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(productos);
    }
    catch (error) {
        response.status(500).json({ message: "error: " + `${error}` });
    }
});
exports.getSucursalProductos = getSucursalProductos;
const createProductoSucursal = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = request;
        yield SucursalProductosDB_1.default.create(body);
        response.json({ msg: "Producto agregado correctamente en la sucursal." });
    }
    catch (error) {
        response.status(500).json({ message: `Error: ${error}` });
    }
});
exports.createProductoSucursal = createProductoSucursal;
const updateProductoSucursal = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigoProducto, codigoSucursal } = request.params;
        const { body } = request;
        const producto = yield SucursalProductosDB_1.default.update(body, {
            where: { codigo_producto: codigoProducto, codigo_sucursal: codigoSucursal },
        });
        if (producto) {
            response.json({
                msg: "Se actualizó correctamente el producto.",
            });
        }
        else {
            response.status(404).json({
                msg: `No se econtró el producto ${codigoProducto} en la sucursal ${codigoSucursal}.`
            });
        }
    }
    catch (error) {
        response.status(500).json({ message: "errError en el servidor: " + `${error}` });
    }
});
exports.updateProductoSucursal = updateProductoSucursal;
const search = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigoSucursal, codigoProducto } = request.params;
        const sucursalProducto = yield SucursalProductosDB_1.default.findOne({
            where: { codigo_sucursal: codigoSucursal, codigo_producto: codigoProducto },
        });
        if (sucursalProducto) {
            response.json(sucursalProducto);
        }
        else {
            response.status(404).json({
                msg: `No se econtro la sucursal producto, con los datos: ${codigoSucursal}, ${codigoProducto}`
            });
        }
    }
    catch (error) {
        response.status(500).json({ message: "Error en el servidor: " + `${error}` });
    }
});
exports.search = search;
