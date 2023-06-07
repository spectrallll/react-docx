import express from "express";
import {setupRoutes} from "./controllers";
import {sequelize} from "../../infrastructure/db/db";
import path from "path";
import { OUTPUT_PATH, UPLOADS_PATH } from "../../business-logic/consts";

async function startApp() {
    await sequelize.authenticate();
    await sequelize.sync();
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    setupRoutes(app);
    app.listen(3000);
    console.log(path.resolve(UPLOADS_PATH));
    console.log(path.resolve(OUTPUT_PATH));
}

startApp();
