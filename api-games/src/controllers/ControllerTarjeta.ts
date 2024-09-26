import { Request, Response } from "express";
import SolicitudTarjetaDB from "../models/tarjeta/SolicitudTarjeta";
import TarjetaDB from "../models/tarjeta/Tarjeta";

//create tarjeta
export const createTarjeta = async (request: Request, response: Response) => {
    try {
        const { body } = request;
        const tarjeta = await TarjetaDB.create(body);
        response.json(tarjeta);
    } catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
};

//update tarjeta
export const updateTarjeta = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { body } = request;
        const tarjeta = await TarjetaDB.findByPk(id);

        if (tarjeta) {
            await tarjeta.update(body);
            response.json(tarjeta);
        } else {
            response.status(404).json({ msg: `Tarjeta no encontrada con el ID: ${id}` });
        }
    } catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
};

//get tarjeq by nit_cliente
export const getTarjetaByClient = async (request: Request, response: Response) => {
   try {
        const { nit }  = request.params;
        const tarjeta = await TarjetaDB.findOne({
            where: { nit_cliente: nit },
        });
        if (tarjeta) {
            response.json(tarjeta);
        } else {
            response.status(404).json({ msg: `Tarjeta no encontrada con el NIT: ${nit}` });
        }
   } catch (error) {
     response.status(500).json({
       message: "Hubo un error en el servidor.",
       error,
     });
   }
};

//list tarjetas
export const listTarjetas = async (request: Request, response: Response) => {
  try {

    const tarjetas = await TarjetaDB.findAll();
    response.json(tarjetas);
  } catch (error) {
    response.status(500).json({
      message: "Hubo un error en el servidor.",
      error,
    });
  }
};

export const listSolicitudes = async (request: Request, response: Response) => {
  try {

    const solicitudes = await SolicitudTarjetaDB.findAll();
    response.json(solicitudes);
  } catch (error) {
    response.status(500).json({
      message: "Hubo un error en el servidor.",
      error,
    });
  }
};

export const getSolicitudById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const solicitud = await SolicitudTarjetaDB.findByPk(id);
        if(solicitud){
            response.json(solicitud);
        } else{
            response.status(404).json({msg: `Solicitud de tarjeta no encontrada con el ID: ${id}`});
        }
    } catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
          });
    }
};

export const createSolicitud = async (request: Request, response: Response) => {
    try {
        const { body } = request;
        const solicitud = await SolicitudTarjetaDB.create(body);
        response.json(solicitud);
    } catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
};

export const updateSolicitud = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { body } = request;
        const solicitud = await SolicitudTarjetaDB.findByPk(id);
        if(solicitud){
            await solicitud.update(body);
            response.json(solicitud);
        } else{
            response.status(404).json({msg: `Solicitud de tarjeta no encontrada con el ID: ${id}`});
        }
    } catch (error) {
        response.status(500).json({
            message: "Hubo un error en el servidor.",
            error,
        });
    }
}