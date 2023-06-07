import { TemplateDTO } from "../../../../business-logic/dto/template";

export interface TemplateCreateResponse {
  message: string;
}

export type TemplateGetResponse = TemplateDTO[];
