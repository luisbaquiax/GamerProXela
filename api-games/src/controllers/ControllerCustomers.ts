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

export const getCustomersByEstado = async (request: Request, response: Response) => {
  try {
    const { estado } = request.params;
    const listCustomers = await ClienteDB.findAll({
      where: { estado: estado },
    });
    response.json(listCustomers);
  } catch (error) {
    response.status(500).json({ message: "error: " + `${error}` });
  }
};

export const createCustomer = async (request: Request, response: Response) => {
  const { body } = request;
  try {
    const newCustomer = await ClienteDB.create(body);
    response.json({
      message: "Cliente creado exitosamente!",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "No se pudo crear el cliente. ",
    });
  }
};

export const updateCustomer = async (request: Request, response: Response) => {
  const { nit } = request.params;
  const { body } = request;
  try {
    const customer = await ClienteDB.findOne({
      where: { nit: nit },
    });

    if (customer) {
      await customer.update(body);
      response.json({
        message: "Se actualizó correctamente al cliente.",
      });
    } else {
      response.status(404).json({
        message: "El cliente no existe con el nit: " + `${nit}`,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "No se pudo actualizar al cliente. ",
    });
  }
};

export const searchCustomer = async (request: Request, response: Response) => {
  try {
    const { nit } = request.params;
    const customer = await ClienteDB.findOne({
      where: { nit: nit },
    });
    if (customer) {
      response.json(customer);
    }else {
      response.status(404).json({message: "El cliente no existe con el nit: " + `${nit}`});
    }
  } catch (error) {
    response.status(500).json({
      message: `Error en el servidor: ${error}`
    });
  }
};
