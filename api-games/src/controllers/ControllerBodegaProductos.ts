import { Request, Response } from "express";
import conn from "../data/Coneccion";
import { QueryTypes } from "sequelize";
import BodegaProductosDb from "../models/bodega/BodegaProductosDB";

export const productosBodega = async (request: Request, response: Response) => {
  try {
    const { username } = request.params;

    const query = `
    SELECT * FROM bodega.get_bodega_productos(:username);
    `;
    const productos = await conn.query(query, {
      replacements: { username: username },
      type: QueryTypes.SELECT,
    });

    response.json(productos);
  } catch (error) {
    response.status(500).json({ message: "error: " + `${error}` });
  }
};

export const updateProductoBodega = async (
  request: Request,
  response: Response
) => {
  const { codigoBodega } = request.params;
  const { codigoProducto } = request.params;
  const { body } = request;

  try {
    const producto = await BodegaProductosDb.findOne({
      where: { codigo_bodega: codigoBodega, codigo_producto: codigoProducto },
    });

    if (producto) {
      await producto.update(body);
      response.json({
        message: "Se actualizó correctamente el producto.",
      });
    } else {
      response.status(404).json({
        message: "No se encontró el producto.",
      });
    }
  } catch (error) {
    console.log("fallo al acutalizar al producto: \n", error);
    response.json({
      message: "No se pudo actualizar al producto. " + `${error}`,
    });
  }
};

export const insertProduct = async (request: Request, response: Response) => {
  const { body } = request;
  try {
    await BodegaProductosDb.create(body);
    response.json({
      message: "El producto se guardo con éxito.",
    });
  } catch (error) {
    response.status(500).json({
      msg: "No se pudo guardar el producto.",
    });
  }
};
