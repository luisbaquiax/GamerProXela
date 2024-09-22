import { Request, Response } from "express";
import ProductoDb from "../models/ProductoModel";

export const getProducts = async (request: Request, response: Response) => {
  try {
    const listProducts = await ProductoDb.findAll();
    response.json(listProducts);
  } catch (error) {
    response.status(500).json({ message: "error: " + `${error}` });
  }
};

export const insertProduct = async (request: Request, response: Response) => {
  try {
    const { body } = await request;
    const { codigo, ...productData } = body;
    await ProductoDb.create(productData);
    response.json({
      msg: "El producto se guardo con éxito.",
    });
  } catch (error) {
    response.status(500).json({ message: "No se pudo guardar producto: " + `${error}` });
  }
};