import { Request, Response } from "express";
import conn from "../data/Coneccion";
import { QueryTypes } from "sequelize";

export const productosInventario = async (request: Request, response: Response) => {
  try {
    const { codigoBodega } = request.params;

    const query = `
      SELECT * FROM bodega.get_productos_inventario(:codigoBodega);
    `;
    const productos = await conn.query(query, {
      replacements: { codigoBodega: codigoBodega },
      type: QueryTypes.SELECT,
    });

    response.json(productos);
  } catch (error) {
    response.status(500).json({ message: "error: " + `${error}` });
  }
};