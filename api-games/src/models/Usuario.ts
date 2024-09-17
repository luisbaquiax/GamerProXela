import coneccion from "../data/Coneccion";
import { DataTypes } from "sequelize";


const UsuarioDB = coneccion.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    tipo: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    schema: "usuario",
    createdAt: false,
    updatedAt: false,
  }
);

export default UsuarioDB;