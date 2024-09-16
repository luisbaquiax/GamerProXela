import { Request, Response } from "express";
import VentaDB from "../models/Venta";

export const getVentasPorSucursal = async (request: Request, response: Response) => {
  try{
    const { codigoSucursal } = request.params;
    
    const ventas = await VentaDB.findAll({
      where: {
          codigo_sucursal: codigoSucursal
      },
    });
    response.json(ventas);
  }catch(error){
    console.log("Imprimiendo error:\n", error);
    response.status(500).json({ message: `${error}` });
  }
};
