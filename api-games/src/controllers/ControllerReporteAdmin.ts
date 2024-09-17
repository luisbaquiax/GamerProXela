import { Request, Response } from "express";
import conn from "../data/Coneccion";
import { QueryTypes } from "sequelize";

export const getTop10Ventas = async (request: Request, response: Response) => {
  try {
    const { fecha1, fecha2 } = request.params;

    const query = `
      SELECT * FROM venta.top_10_ventas(:fecha1, :fecha2);
    `;

    const productos = await conn.query(query, {
      replacements: { fecha1:  fecha1, fecha2: fecha2 },
      type: QueryTypes.SELECT,
    });

    response.json(productos);
  } catch (error) {
    response.status(500).json({ message: "error: " + `${error}` });
  }
};

export const getTopSucursales = async (request: Request, response: Response) => {
    try {
        const query = `SELECT * FROM venta.top2_sucursales;`;
        const sucursales = await conn.query(query, {
            type: QueryTypes.SELECT,
        });
        response.json(sucursales);
    }catch (error) {
        response.status(500).json({ message: `${error}` });
    }
}

export const getTop10Productos = async (request: Request, response: Response) => {
    try {
        const query = `
            SELECT * FROM venta.top10_articulos;
        `;
        const productos = await conn.query(query, {
            type: QueryTypes.SELECT,
        });
        response.json(productos);
    }catch(error) {
        response.status(500).json({ message: `${error}` });
    }
};

export const getTop10Clientes = async (request: Request, response: Response) => {
    try {
        const query = `
            SELECT * FROM venta.top10_clientes;
        `;
        const clientes = await conn.query(query, {
            type: QueryTypes.SELECT,
        });
        response.json(clientes);
    }catch(error) {
        response.status(500).json({ message: `${error}` });
    }
};