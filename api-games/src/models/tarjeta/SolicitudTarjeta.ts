import coneccion from "../../data/Coneccion";
import { DataTypes } from "sequelize";

const SolicitudTarjetaDB = coneccion.define(
  "solicitud_tarjeta",
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
    estado: {
        type: DataTypes.NUMBER,
    },
  },
  {
    tableName: "solicitud_tarjeta",
    schema: "usuario",
    createdAt: false,
    updatedAt: false,
  }
);

export default SolicitudTarjetaDB;
