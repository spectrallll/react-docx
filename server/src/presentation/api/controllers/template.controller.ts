import {Router, Request, Response} from "express";
import {container} from "../../../infrastructure/di";
import {CreateTemplateDTO, GetTemplateDTO} from "../../../business-logic/dto/template";
import {
    TemplateCreateRequest,
    TemplateGetRequest
} from "./requests/template";
import {FieldDTO} from "../../../business-logic/dto/field";
import { TemplateCreateResponse, TemplateGetResponse } from "./responses/template";


export const templateRouter = Router();

templateRouter.post("/create", async (req: Request<any, any, TemplateCreateRequest>, res: Response<TemplateCreateResponse>) => {
    const templateCreateService = container.resolve("TemplateCreateService");

    const userId = req.body.userId;
    const templateName = req.body.name;
    const fields = req.body.fields.map(field => new FieldDTO(field.value, field.variable));

    await templateCreateService.execute(new CreateTemplateDTO(templateName, userId, fields));
    return res.status(200).json({ message: "Template was created "});
});

templateRouter.post("/", async (req: Request<any, any, TemplateGetRequest>, res: Response<TemplateGetResponse>) => {
    const templateGetService = container.resolve("TemplateGetService");

    const userId = req.body.userId;

    const data = await templateGetService.execute(new GetTemplateDTO(userId));
    return res.status(200).json(data);
});
