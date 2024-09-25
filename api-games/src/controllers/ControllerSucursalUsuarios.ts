import { Request, Response } from "express";
import SucursalUsuarios from "../models/sucursal/SucursalUsuarios";

export const getSucursalByUser = async (request: Request, response: Response)=>{
    try {
        const { username } = request.params;

        const user = await SucursalUsuarios.findOne({
            where: {
                username_usuario: username,
            }
        });
        if (user) {
            response.json(user);
        }else {
            response.status(401).json({
                message: "El usuario no está en la sucursal.",
            });
            return;
        }
    } catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
          });
    }
};

export const createUserSucursal = async (request: Request, response: Response) => {
    try {
        const { body } = request;
        await SucursalUsuarios.create(body);
        response.json({
            msg: "El usuario se agregó correctamente en la sucursal.",
        });
    } catch (error) {
        response.status(500).json({
            message: "No se pudo crear al usuario.",
            error,
          });
    }
};

