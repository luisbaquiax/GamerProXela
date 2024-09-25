import coneccion from "../../data/Coneccion";
import { DataTypes } from "sequelize";

const SucursalUsuarios = coneccion.define(
  "sucursal_usuarios",
  {
    username_usuario: 
    { 
        type: DataTypes.STRING,
        primaryKey: true 
    },
    codigo_sucursal: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
  },
  {
    tableName: "sucursal_usuarios",
    schema: "sucursal",
    createdAt: false,
    updatedAt: false,
  }
);

export default SucursalUsuarios;
