import {Router, Request, Response} from "express";
import { uploads } from "../middlewares/storage";
import { container } from "../../../infrastructure/di";
import { DocumentEditDTO } from "../../../business-logic/dto/document";

export const documentRouter = Router();

documentRouter.post('/', uploads.single('file'), (req: Request, res: Response) => {
    const documentEditService = container.resolve("DocumentEditService");
    if (!req.file) {
        res.status(400).json({message: "Файл не передан"})
    }
    return res.sendFile(documentEditService.execute(new DocumentEditDTO(req.body.fields, req.file?.filename || req.file?.originalname || "document.docx")));
});