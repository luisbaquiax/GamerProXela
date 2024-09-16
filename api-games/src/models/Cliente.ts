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
  },
  {
    tableName: "clientes",
    createdAt: false,
    updatedAt: false,
  }
);

export default ClienteDB;
