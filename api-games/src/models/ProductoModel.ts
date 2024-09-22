import coneccion from "../data/Coneccion";
import { DataTypes } from "sequelize";


const ProductoDb = coneccion.define(
  "productos",
  {
    codigo: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "productos",
    schema: "producto",
    createdAt: false,
    updatedAt: false,
  }
);

export default ProductoDb;