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
exports.insertProduct = exports.getProducts = void 0;
const ProductoModel_1 = __importDefault(require("../models/ProductoModel"));
const getProducts = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listProducts = yield ProductoModel_1.default.findAll();
        response.json(listProducts);
    }
    catch (error) {
        response.status(500).json({ message: "error: " + `${error}` });
    }
});
exports.getProducts = getProducts;
const insertProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*const { body } =  request;
        //const { codigo, ...productData } = body;
        console.log(body);
        const { nombre, precio } = body;
        await ProductoDb.create({nombre, precio});*/
        const { body } = request; // No necesitas 'await' aquí
        const { nombre, precio } = body;
        yield ProductoModel_1.default.create({ nombre, precio });
        response.status(201).json({
            msg: "El producto se guardó con éxito.",
        });
        response.json({
            msg: "El producto se guardo con éxito.",
        });
    }
    catch (error) {
        response.status(500).json({ message: "No se pudo guardar producto: " + `${error}` });
    }
});
exports.insertProduct = insertProduct;
