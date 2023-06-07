export interface Field {
    variable: string;
    value: ""
}

export interface TemplateCreateRequest {
    name: string;
    userId: number;
    fields: Field[];
}

export interface TemplateGetRequest {
    userId: number;
}

