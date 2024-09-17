import { Sequelize } from "sequelize";

const coneccion = new Sequelize("games2", "postgres", "luisbaquiax@1234", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

export default coneccion;
