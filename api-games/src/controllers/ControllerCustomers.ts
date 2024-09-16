import { Request, Response } from "express";
import ClienteDB from "../models/Cliente";

export const getCustomers = async (request: Request, response: Response) => {
  try {
    const listCustomers = await ClienteDB.findAll();
    response.json(listCustomers);
  } catch (error) {
    response.status(500).json({ message: "error: " + `${error}` });
  }
};
