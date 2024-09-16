import { Request, Response } from "express";
import VentaProductoDB from "../models/VentaProducto";

export const productosPorVenta = async (request: Request, response: Response) => {
  try{
    const { codigoVenta } = request.params;
    
    const productos = await VentaProductoDB.findAll({
      where: {
        codigo_venta: codigoVenta
      },
    });
    response.json(productos);
  }catch(error){
    console.log("Imprimiendo error:\n", error);
    response.status(500).json({ error: `${error}` });
  }
};