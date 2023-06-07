import { DocumentEditDTO } from "../dto/document";
import { DocxAdapter } from "../../infrastructure/docx/adapter";


export class DocumentEditService {
    private docxAdapter: DocxAdapter;
    constructor(adapter: DocxAdapter) {
        this.docxAdapter = adapter;
    }
    execute(dto: DocumentEditDTO) {
       return this.docxAdapter.edit(dto.fields, dto.fileName);
    }
}
