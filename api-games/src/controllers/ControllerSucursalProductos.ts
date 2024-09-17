import { Request, Response } from "express";
import conn from "../data/Coneccion";
import { QueryTypes } from "sequelize";

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
