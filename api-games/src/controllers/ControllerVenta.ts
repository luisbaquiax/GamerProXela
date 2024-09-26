import { Request, Response } from "express";
import VentaDB from "../models/Venta";
import { Op } from "sequelize";

export const createVenta =  async (request: Request, response: Response) => {
  try {
    const { body } = request;
    await VentaDB.create(body);
    response.json({ message: "Venta creada exitosamente." });
  } catch (error) {
    response.status(500).json({ message: `${error}` });
  }
}

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
    response.status(500).json({ message: `${error}` });
  }
};

// SELECT * FROM venta.ventas ORDER BY codigo DESC; 
export const getVentas = async (request: Request, response: Response) => {
  try { 
    const ventas = await VentaDB.findAll({
      order: [
        ['codigo', 'DESC'],
      ],
    });
    response.json(ventas);
  } catch (error) {
    response.status(500).json({ message: `Error en el servidor, ${error}` });
  }
};

//SELECT * FROM venta.ventas WHERE descuento >0 ORDER BY codigo DESC;
export const historialDescuetos = async (request: Request, response: Response) =>{
  try {
    const ventas = await VentaDB.findAll({
      where: {
        descuento: { [Op.gt]: 0 }
      },
      order: [
        ['codigo', 'DESC'],
      ],
    });
    response.json(ventas);
  } catch (error) {
    response.status(500).json({ message: `Error en el servidor, ${error}` });
  }
};