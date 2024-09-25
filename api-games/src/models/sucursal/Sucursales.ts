import coneccion from "../../data/Coneccion";
import { DataTypes } from "sequelize";

const SucursalesDb = coneccion.define(
  "sucursales",
  {
    codigo: 
    { 
        type: DataTypes.INTEGER,
        primaryKey: true 
    },
    nombre: {
        type:DataTypes.STRING,
    }
  },
  {
    tableName: "sucursales",
    schema: "sucursal",
    createdAt: false,
    updatedAt: false,
  }
);

export default SucursalesDb;