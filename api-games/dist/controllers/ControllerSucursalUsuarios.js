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
exports.createUserSucursal = exports.getSucursalByUser = void 0;
const SucursalUsuarios_1 = __importDefault(require("../models/sucursal/SucursalUsuarios"));
const getSucursalByUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = request.params;
        const user = yield SucursalUsuarios_1.default.findOne({
            where: {
                username_usuario: username,
            }
        });
        if (user) {
            response.json(user);
        }
        else {
            response.status(401).json({
                message: "El usuario no está en la sucursal.",
            });
            return;
        }
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.getSucursalByUser = getSucursalByUser;
const createUserSucursal = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = request;
        yield SucursalUsuarios_1.default.create(body);
        response.json({
            msg: "El usuario se agregó correctamente en la sucursal.",
        });
    }
    catch (error) {
        response.status(500).json({
            message: "No se pudo crear al usuario.",
            error,
        });
    }
});
exports.createUserSucursal = createUserSucursal;
