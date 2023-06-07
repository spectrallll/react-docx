import {DTO} from "./common";
import {FieldDTO} from "./field";


export class TemplateDTO extends DTO {
    id: number;
    name: string;
    fields: FieldDTO[];
    constructor(id: number, name: string, fields: FieldDTO[]) {
        super();
        this.id = id;
        this.name = name;
        this.fields = fields;
    }
}

export class CreateTemplateDTO extends DTO {
    name: string;
    userId: number;
    fields: FieldDTO[];
    constructor(name: string, userId: number, fields: FieldDTO[]) {
        super();
        this.name = name;
        this.userId = userId;
        this.fields = fields;
    }
}

export class GetTemplateDTO extends DTO {
    userId: number;
    constructor(userId: number) {
        super();
        this.userId = userId
    }
}
