import { Request, Response } from "express";
import usuarioDB from "../models/Usuario";

export const getUsers = async (request: Request, response: Response) => {
  try {
    const { Op } = require("sequelize");

    const listUsers = await usuarioDB.findAll({
      attributes: ["username", "password", "tipo", "estado"],
      where: {
        tipo: {
          [Op.ne]: "ADMIN",
        },
      },
    });
    response.json(listUsers);
  } catch (error) {
    response.status(500).json({
      message: "Hubo un error en el servidor.",
      error,
    });
  }
};

export const searchUser = async (request: Request, response: Response) => {
  const { username, password } = request.params;

  try {
    const user = await usuarioDB.findOne({
      attributes: ["username", "password", "tipo", "estado"],
      where: { username: username, password: password },
    });

    if (user) {
      response.json(user);
    } else {
      console.log(user);
      response.status(404).json({
        message: "Contraseña o username incorrectos.",
      });
    }
  } catch (error) {
    response.status(500).json({
      message: "Hubo un error en el servidor.",
      error,
    });
  }
};

export const createUser = async (request: Request, response: Response) => {
  const { body } = request;
  try {
    await usuarioDB.create(body);
    response.json({
      msg: "El usuario se guardo con éxito.",
    });
  } catch (error) {
    response.json({
      msg: "No se pudo crear al usuario.",
    });
  }
};

export const updateUser = async (request: Request, response: Response) => {
  const { username } = request.params;
  const { body } = request;

  try {
    const usuario = await usuarioDB.findOne({
      where: { username: username },
    });

    if (usuario) {
      await usuario.update(body);
      response.json({
        message: "Se actualizó correctamente al usuario.",
      });
    } else {
      response.status(404).json({
        message: "No se encontró el usuario con el username: " + username,
      });
    }
  } catch (error) {
    console.log("fallo al acutalizar al usuario: \n", error);
    response.json({
      message: "No se pudo actualizar al usuario. " + `${error}`,
    });
  }
};
