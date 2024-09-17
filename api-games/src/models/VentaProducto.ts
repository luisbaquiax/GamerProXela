import coneccion from "../data/Coneccion";
import { DataTypes } from "sequelize";


const VentaProductoDB = coneccion.define(
  "productos_venta",
  {
    codigo_venta: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    codigo_producto: {
      type: DataTypes.NUMBER,
    },
    precio_unitario: {
      type: DataTypes.NUMBER,
    },
    cantidad: {
      type: DataTypes.NUMBER,
    },
  },
  {
    tableName: "productos_ventas",
    schema:"venta",
    createdAt: false,
    updatedAt: false,
  }
);

export default VentaProductoDB;