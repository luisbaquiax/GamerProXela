import { Request, Response } from "express";
import SucursalesDb from "../models/sucursal/Sucursales";

export const listSucursales = async (request: Request, response: Response) => {
    try {
        const sucursales = await SucursalesDb.findAll();
        response.json(sucursales);
    } catch (error) {
        response.status(500).json({ message: "Error: " + `${error}` });
    }
};