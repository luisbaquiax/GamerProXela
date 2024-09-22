import { DataTypes } from "sequelize";
import coneccion from "../../data/Coneccion";

const BodegaProductosDb = coneccion.define(
  "productos",
  {
    codigo_bodega: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    codigo_producto: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.NUMBER,
    },
  },
  {
    tableName: "bodega_productos",
    schema: "bodega",
    createdAt: false,
    updatedAt: false,
  }
);

export default BodegaProductosDb;
