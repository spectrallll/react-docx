import { TemplateDAO } from "../interfaces/persistance/template";
import {CreateTemplateDTO, GetTemplateDTO} from "../dto/template";

export class TemplateGetService {
    templateDAO;
    constructor(templateDAO: TemplateDAO) {
        this.templateDAO = templateDAO;
    }
    execute(dto: GetTemplateDTO) {
        return this.templateDAO.getAllByUser(dto.userId)
    }
}

export class TemplateCreateService {
    templateDAO;
    constructor(templateDAO: TemplateDAO) {
        this.templateDAO = templateDAO
    }

    async execute(dto: CreateTemplateDTO) {
        const fields = dto.fields.map(field => ({variable: field.variable, value: field.value}))
        return await this.templateDAO.create(dto.name, dto.userId, fields);
    }
}
