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
exports.productosInventario = void 0;
const Coneccion_1 = __importDefault(require("../data/Coneccion"));
const sequelize_1 = require("sequelize");
const productosInventario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigoBodega } = request.params;
        const query = `
      SELECT * FROM bodega.get_productos_inventario(:codigoBodega);
    `;
        const productos = yield Coneccion_1.default.query(query, {
            replacements: { codigoBodega: codigoBodega },
            type: sequelize_1.QueryTypes.SELECT,
        });
        response.json(productos);
    }
    catch (error) {
        response.status(500).json({ message: "error: " + `${error}` });
    }
});
exports.productosInventario = productosInventario;
