import coneccion from "../data/Coneccion";
import { DataTypes } from "sequelize";

const ClienteDB = coneccion.define(
  "cliente",
  {
    nit: 
    { 
        type: DataTypes.STRING,
        primaryKey: true 
    },
    nombre: {
        type:DataTypes.STRING
    },
    estado: {
      type:DataTypes.STRING
  },
  },
  {
    tableName: "clientes",
    schema: "usuario",
    createdAt: false,
    updatedAt: false,
  }
);

export default ClienteDB;
