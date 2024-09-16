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
exports.updateUser = exports.createUser = exports.searchUser = exports.getUsers = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const getUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Op } = require("sequelize");
        const listUsers = yield Usuario_1.default.findAll({
            attributes: ["username", "password", "tipo", "estado"],
            where: {
                tipo: {
                    [Op.ne]: "ADMIN",
                },
            },
        });
        response.json(listUsers);
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.getUsers = getUsers;
const searchUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.params;
    try {
        const user = yield Usuario_1.default.findOne({
            attributes: ["username", "password", "tipo", "estado"],
            where: { username: username, password: password },
        });
        if (user) {
            response.json(user);
        }
        else {
            console.log(user);
            response.status(404).json({
                message: "Contraseña o username incorrectos.",
            });
        }
    }
    catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
});
exports.searchUser = searchUser;
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    try {
        yield Usuario_1.default.create(body);
        response.json({
            msg: "El usuario se guardo con éxito.",
        });
    }
    catch (error) {
        response.json({
            msg: "No se pudo crear al usuario.",
        });
    }
});
exports.createUser = createUser;
const updateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = request.params;
    const { body } = request;
    try {
        const usuario = yield Usuario_1.default.findOne({
            where: { username: username },
        });
        if (usuario) {
            yield usuario.update(body);
            response.json({
                message: "Se actualizó correctamente al usuario.",
            });
        }
        else {
            response.status(404).json({
                message: "No se encontró el usuario con el username: " + username,
            });
        }
    }
    catch (error) {
        console.log("fallo al acutalizar al usuario: \n", error);
        response.json({
            message: "No se pudo actualizar al usuario. " + `${error}`,
        });
    }
});
exports.updateUser = updateUser;
