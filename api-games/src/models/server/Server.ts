import express, { Application, Request, Response } from "express";
import cors from "cors";
import routesUsers from "../../routers/RoutersUsers";
import routerVentas from "../../routers/RoutersVentas";
import routerCustomers from "../../routers/RoutersCustomers";
import routerSucursal from "../../routers/RoutersSucursal";
import routerBodega from "../../routers/RoutersBodega";
import routerReportesAdmin from "../../routers/RouterReporteAdmin";
import dataBase from "../../data/Coneccion";

export class Server {
  public app: Application;
  public puerto: String;

  constructor() {
    this.app = express();
    this.puerto = process.env.PORT || "3001";
    this.listen();
    this.casteoJSON();
    this.routes();
    this.getConeccionDb();
  }

  listen() {
    this.app.listen(this.puerto, () => {
      console.log(`aplicacion corriendo en puert ${this.puerto}`);
    });
  }

  routes() {
    this.app.get("/", (request: Request, response: Response) => {
      response.json({
        msg: "API corriendo... Hola Luis",
      });
    });
    //routers: users, ventas, customers, sucursal
    this.app.use("/api/users", routesUsers);
    this.app.use("/api/ventas", routerVentas);
    this.app.use("/api/customers", routerCustomers);
    this.app.use("/api/sucursal", routerSucursal);
    this.app.use("/api/bodega", routerBodega);
    this.app.use("/api/reportsAdmin", routerReportesAdmin);
  }

  casteoJSON() {
    //parseamos el body
    this.app.use(express.json());
    //agregamos cors
    this.app.use(cors());
  }

  async getConeccionDb() {
    try {
      await dataBase.authenticate();
      console.log("Conectado a DB!!!.");
    } catch (error) {
      console.error("Error al conectarse a la base de datos:\n", error);
    }
  }
}
