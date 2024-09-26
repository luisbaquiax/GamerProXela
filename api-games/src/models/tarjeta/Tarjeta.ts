import coneccion from "../../data/Coneccion";
import { DataTypes } from "sequelize";

const TarjetaDB = coneccion.define(
  "tarjetas",
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true
    },
    nit_cliente: {
      type: DataTypes.STRING,
    },
    tipo: {
        type: DataTypes.STRING,
      },
    fecha_activacion: {
        type: DataTypes.DATE,
    },
    puntos: {
        type: DataTypes.NUMBER,
    },
  },
  {
    tableName: "tarjetas",
    schema: "usuario",
    createdAt: false,
    updatedAt: false,
  }
);

export default TarjetaDB;
