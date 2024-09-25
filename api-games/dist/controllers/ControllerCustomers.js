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
exports.searchCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomersByEstado = exports.getCustomers = void 0;
const Cliente_1 = __importDefault(require("../models/Cliente"));
const getCustomers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listCustomers = yield Cliente_1.default.findAll();
        response.json(listCustomers);
    }
    catch (error) {
        response.status(500).json({ message: "error: " + `${error}` });
    }
});
exports.getCustomers = getCustomers;
const getCustomersByEstado = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado } = request.params;
        const listCustomers = yield Cliente_1.default.findAll({
            where: { estado: estado },
        });
        response.json(listCustomers);
    }
    catch (error) {
        response.status(500).json({ message: "error: " + `${error}` });
    }
});
exports.getCustomersByEstado = getCustomersByEstado;
const createCustomer = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    try {
        const newCustomer = yield Cliente_1.default.create(body);
        response.json({
            message: "Cliente creado exitosamente!",
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "No se pudo crear el cliente. ",
        });
    }
});
exports.createCustomer = createCustomer;
const updateCustomer = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { nit } = request.params;
    const { body } = request;
    try {
        const customer = yield Cliente_1.default.findOne({
            where: { nit: nit },
        });
        if (customer) {
            yield customer.update(body);
            response.json({
                message: "Se actualizó correctamente al cliente.",
            });
        }
        else {
            response.status(404).json({
                message: "El cliente no existe con el nit: " + `${nit}`,
            });
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "No se pudo actualizar al cliente. ",
        });
    }
});
exports.updateCustomer = updateCustomer;
const searchCustomer = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nit } = request.params;
        const customer = yield Cliente_1.default.findOne({
            where: { nit: nit },
        });
        if (customer) {
            response.json(customer);
        }
        else {
            response.status(404).json({ message: "El cliente no existe con el nit: " + `${nit}` });
        }
    }
    catch (error) {
        response.status(500).json({
            message: `Error en el servidor: ${error}`
        });
    }
});
exports.searchCustomer = searchCustomer;
