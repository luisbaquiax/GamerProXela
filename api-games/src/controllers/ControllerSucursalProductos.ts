import { Request, Response } from "express";
import conn from "../data/Coneccion";
import { QueryTypes } from "sequelize";
import SucursalProductosDB from "../models/sucursal/SucursalProductosDB";

export const getSucursalProductos = async (request: Request, response: Response) => {
  try {
    const { username } = request.params;

    const query = `
       SELECT * FROM sucursal.get_sucursal_productos(:username);
    `;

    const productos = await conn.query(query, {
      replacements: { username:  username },
      type: QueryTypes.SELECT,
    });

    response.json(productos);
  } catch (error) {
    response.status(500).json({ message: "error: " + `${error}` });
  }
};

export const createProductoSucursal = async (request: Request, response: Response) => {
  try {
    const { body } = request;
    await SucursalProductosDB.create(body);
    response.json({ msg: "Producto agregado correctamente en la sucursal." });
  } catch (error) {
    response.status(500).json({ message:  `Error: ${error}` });
  }

};

export const updateProductoSucursal = async (request: Request, response: Response) => {
  try {
    const { codigoProducto, codigoSucursal } = request.params;
    const { body } = request;

    const producto = await SucursalProductosDB.update(body,{
      where: { codigo_producto: codigoProducto, codigo_sucursal: codigoSucursal },
    });

    if(producto){
      response.json({
        msg: "Se actualizó correctamente el producto.",
      });
    }else{
      response.status(404).json({
        msg: `No se econtró el producto ${codigoProducto} en la sucursal ${codigoSucursal}.`
      });
    }

  } catch (error) {
    response.status(500).json({ message: "errError en el servidor: " + `${error}` });
  }
};

export const search = async (request: Request, response: Response) => {
  try {
    const { codigoSucursal, codigoProducto } = request.params;
    const sucursalProducto = await SucursalProductosDB.findOne({
      where: { codigo_sucursal: codigoSucursal, codigo_producto: codigoProducto},
    });
    if(sucursalProducto){
      response.json(sucursalProducto);
    }else{
      response.status(404).json({
        msg: `No se econtro la sucursal producto, con los datos: ${codigoSucursal}, ${codigoProducto}`
      });
    }
  } catch (error) {
    response.status(500).json({ message: "Error en el servidor: " + `${error}` });
  }
};

