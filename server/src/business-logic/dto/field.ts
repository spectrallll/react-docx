import {DTO} from "./common";


export class FieldDTO extends DTO {
    value: string;
    variable: string;
    constructor(value: string, variable: string) {
        super();
        this.value = value;
        this.variable = variable;
    }
}
