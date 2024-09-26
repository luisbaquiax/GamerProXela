import coneccion from "../data/Coneccion";
import { DataTypes } from "sequelize";


const VentaDB = coneccion.define(
  "venta",
  {
    codigo: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    nit_cliente: {
      type: DataTypes.STRING,
    },
    username_usuario: {
      type: DataTypes.STRING,
    },
    fecha: {
      type: DataTypes.STRING,
    },
    total:{
        type: DataTypes.NUMBER
    },
    descuento:{
        type: DataTypes.NUMBER
    },
    codigo_sucursal:{
        type: DataTypes.NUMBER
    }
  },
  {
    tableName: "ventas",
    schema: "venta",
    createdAt: false,
    updatedAt: false,
  }
);

export default VentaDB;