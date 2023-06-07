import {TemplateDAO} from "../../../business-logic/interfaces/persistance/template";
import {Template} from "../models/template";
import {Field} from "../models/field";
import {TemplateDTO} from "../../../business-logic/dto/template";


export class TemplateDAOImpl implements TemplateDAO {
    async create(name: string, userId: number, fields: {variable: string, value: string}[]) {
        const template = await Template.create({ name, userId: 1 });

        for (const field of fields) {
            const model = await Field.create({ variable: field.variable, value: "", templateId: template.get("id") })
        }

        return;
    }
    async getAllByUser(userId:number): Promise<TemplateDTO[]> {
        const data = await Template.findAll({ where: { userId }, include: [{
            model: Field,
            }]});
        return data.map((template: {id: number, name: string, fields: any[]})=> new TemplateDTO(
            template.id,
            template.name,
            template.fields
        ));
    }
    delete() {
    }
}