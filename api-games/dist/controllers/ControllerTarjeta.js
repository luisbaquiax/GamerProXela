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
exports.updateSolicitud = exports.createSolicitud = exports.getSolicitudById = exports.listSolicitudes = exports.listTarjetas = exports.getTarjetaByClient = exports.updateTarjeta = exports.createTarjeta = void 0;
const SolicitudTarjeta_1 = __importDefault(require("../models/tarjeta/SolicitudTarjeta"));
const Tarjeta_1 = __importDefault(require("../models/tarjeta/Tarjeta"));
//create tarjeta
const createTarjeta = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = request;
        const tarjeta = yield Tarjeta_1.default.create(body);
        response.json(tarjeta);
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.createTarjeta = createTarjeta;
//update tarjeta
const updateTarjeta = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const { body } = request;
        const tarjeta = yield Tarjeta_1.default.findByPk(id);
        if (tarjeta) {
            yield tarjeta.update(body);
            response.json(tarjeta);
        }
        else {
            response.status(404).json({ msg: `Tarjeta no encontrada con el ID: ${id}` });
        }
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.updateTarjeta = updateTarjeta;
//get tarjeq by nit_cliente
const getTarjetaByClient = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nit } = request.params;
        const tarjeta = yield Tarjeta_1.default.findOne({
            where: { nit_cliente: nit },
        });
        if (tarjeta) {
            response.json(tarjeta);
        }
        else {
            response.status(404).json({ msg: `Tarjeta no encontrada con el NIT: ${nit}` });
        }
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.getTarjetaByClient = getTarjetaByClient;
//list tarjetas
const listTarjetas = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjetas = yield Tarjeta_1.default.findAll();
        response.json(tarjetas);
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.listTarjetas = listTarjetas;
const listSolicitudes = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitudes = yield SolicitudTarjeta_1.default.findAll();
        response.json(solicitudes);
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.listSolicitudes = listSolicitudes;
const getSolicitudById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const solicitud = yield SolicitudTarjeta_1.default.findByPk(id);
        if (solicitud) {
            response.json(solicitud);
        }
        else {
            response.status(404).json({ msg: `Solicitud de tarjeta no encontrada con el ID: ${id}` });
        }
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.getSolicitudById = getSolicitudById;
const createSolicitud = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = request;
        const solicitud = yield SolicitudTarjeta_1.default.create(body);
        response.json(solicitud);
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.createSolicitud = createSolicitud;
const updateSolicitud = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const { body } = request;
        const solicitud = yield SolicitudTarjeta_1.default.findByPk(id);
        if (solicitud) {
            yield solicitud.update(body);
            response.json(solicitud);
        }
        else {
            response.status(404).json({ msg: `Solicitud de tarjeta no encontrada con el ID: ${id}` });
        }
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.updateSolicitud = updateSolicitud;
