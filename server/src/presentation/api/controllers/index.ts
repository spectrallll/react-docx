import {Express} from "express";
import { templateRouter } from "./template.controller";
import { Router} from "express";
import { documentRouter } from "./document.controller";


export function setupRoutes(app: Express) {
    const mainRouter = Router();
    mainRouter.use("/template", templateRouter);
    mainRouter.use("/document", documentRouter);
    app.use("/api", mainRouter);
}
