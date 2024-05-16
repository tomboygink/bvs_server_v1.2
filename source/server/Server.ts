import path from "path";
import hbs from "hbs";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import config from "../config/config.json";
import { Router } from "./Router";

import cors from "cors";

class Server {
  app: express.Express = null;
  server: http.Server = null;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app); //Создание сервера

    this.app.set("view engine", "hbs"); //Подключение шаблонизатора
    console.log(path.normalize(path.join(__dirname, "..", "views")));
    this.app.set("views", path.normalize(path.join(__dirname, "..", "views"))); //Путь к шаблонизатору
    console.log(path.join(__dirname, "..", "public"));
    this.app.use(
      "/static",
      express.static(path.join(__dirname, "..", "public"))
    ); //Путь к статическому файлу
  }

  //Маршрутизация по ссылкам
  route() {
    // Роутинг для страниц клиента

    // this.app.get("/", (req, res) => {
    //     res.render("index.hbs") //отрисовка шаблонизатора
    // });

    this.app.use(cors());
    this.app.use(bodyParser.json()); //Парсер для post запросов
    // Пост-запрос для обмена данными
    this.app.post(
      "/api",
      async (req: express.Request, res: express.Response) => {
        //console.log("req.method ", req.method);
        //console.log("req.body ", req.body);
        res.send(await Router(req.body));
      }
    );
  }

  //Запуск сервера
  run() {
    this.route();
    this.server.listen(config.server_config.port, () => {
      console.log(
        `Сервер запушен: http://${config.server_config.host}:${config.server_config.port}`
      );
    });
  }
}

var srv = new Server();
srv.run();
