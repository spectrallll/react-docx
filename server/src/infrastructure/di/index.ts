import {asValue, createContainer} from "awilix";
import {TemplateDAOImpl} from "../db/dao/templateDAO";
import {TemplateCreateService, TemplateGetService} from "../../business-logic/services/templateService";
import { DocumentEditService } from "../../business-logic/services/documentService";
import { DocxAdapter } from "../docx/adapter";


export function setupDI() {
    const container = createContainer();

    const templateDAO = new TemplateDAOImpl();
    const docxAdapter = new DocxAdapter();
    const templateCreateService = new TemplateCreateService(templateDAO);
    const templateGetService = new TemplateGetService(templateDAO);
    const documentEditService = new DocumentEditService(docxAdapter);

    container.register({
        TemplateCreateService: asValue(templateCreateService),
        TemplateGetService: asValue(templateGetService),
        DocumentEditService: asValue(documentEditService)
    })

    return container;
}

export const container = setupDI();


