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
exports.insertProduct = exports.updateProductoBodega = exports.productosBodega = void 0;
const Coneccion_1 = __importDefault(require("../data/Coneccion"));
const sequelize_1 = require("sequelize");
const BodegaProductosDB_1 = __importDefault(require("../models/bodega/BodegaProductosDB"));
const productosBodega = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = request.params;
        const query = `
    SELECT * FROM bodega.get_bodega_productos(:username);
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
exports.productosBodega = productosBodega;
const updateProductoBodega = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigoBodega } = request.params;
    const { codigoProducto } = request.params;
    const { body } = request;
    try {
        const producto = yield BodegaProductosDB_1.default.findOne({
            where: { codigo_bodega: codigoBodega, codigo_producto: codigoProducto },
        });
        if (producto) {
            yield producto.update(body);
            response.json({
                message: "Se actualizó correctamente el producto.",
            });
        }
        else {
            response.status(404).json({
                message: "No se encontró el producto.",
            });
        }
    }
    catch (error) {
        console.log("fallo al acutalizar al producto: \n", error);
        response.json({
            message: "No se pudo actualizar al producto. " + `${error}`,
        });
    }
});
exports.updateProductoBodega = updateProductoBodega;
const insertProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    try {
        yield BodegaProductosDB_1.default.create(body);
        response.json({
            message: "El producto se guardo con éxito.",
        });
    }
    catch (error) {
        response.status(500).json({
            msg: "No se pudo guardar el producto.",
        });
    }
});
exports.insertProduct = insertProduct;
