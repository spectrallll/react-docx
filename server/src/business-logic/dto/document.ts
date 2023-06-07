import { DTO } from "./common";
import { FieldDTO } from "./field";

export class DocumentEditDTO extends DTO {
    fields: FieldDTO[];
    fileName: string;
    constructor(fields: FieldDTO[], fileName: string) {
        super();
        this.fields = fields;
        this.fileName = fileName;
    }
}