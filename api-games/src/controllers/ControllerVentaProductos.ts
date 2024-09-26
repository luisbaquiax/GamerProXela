import { Request, Response } from "express";
import VentaProductoDB from "../models/VentaProducto";
import conn from "../data/Coneccion";
import { QueryTypes } from "sequelize";

export const agregarProducto = async (request: Request, response: Response) => {
  try {
    const { body } = request;
    await VentaProductoDB.create(body);
    response.json({ msg: "Producto agregado correctamente en la venta." });
  } catch (error) {
    response.status(500).json({ error: `No se pudo guardar el producto ${error}` });
  }
}

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

export const ventasPorCliente = async (request: Request, response: Response) => {
  try {

    const { nitCliente } = request.params;
    
    const query = `
      SELECT * FROM venta.ventas_cliente(:nitCliente);
    `;
    const ventas = await conn.query(query,{
      replacements: { nitCliente: nitCliente },
      type: QueryTypes.SELECT,
    });
    response.json(ventas);
  } catch (error) {
    response.status(500).json({ error: `${error}`});
  }
}

export const ventasPorSucursal = async (request: Request, response: Response) => {
  try {
    const { codigoSucursal } = request.params;

    const query = `
      SELECT * FROM venta.ventas_sucursal(:codigoSucursal);
    `;
    const ventas = await conn.query(query, {
      replacements: { codigoSucursal: codigoSucursal },
      type: QueryTypes.SELECT,
    });
    response.json(ventas);
  } catch (error) {
    response.status(500).json({ error: `${error}`});
  }
}

export const detallVenta = async (request: Request, response: Response) => {
  try {
    const { codigoVenta } = request.params;

    const query = `
      SELECT * FROM venta.detalle_venta(:codigoVenta);
    `;

    const productos = await conn.query(query, {
      replacements: { codigoVenta:  codigoVenta },
      type: QueryTypes.SELECT,
    });

    response.json(productos);
  } catch (error) {
    response.status(500).json({ message: "error: " + `${error}` });
  }
};
