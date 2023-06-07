import { FieldDTO } from "../../business-logic/dto/field";
import path from "path";
import { OUTPUT_PATH, UPLOADS_PATH } from "../../business-logic/consts";
import fs from "fs";
import { getDocx, getZip } from "./factory";
import { transformArrayToObject } from "./utils";

interface Adapter {
    edit(fields: FieldDTO[], fileName: string): void
}

export class DocxAdapter implements Adapter {
    constructor() {
    }

    edit(fields: FieldDTO[], fileName: string) {
        const filePath = path.resolve(UPLOADS_PATH, fileName);

        const content = fs.readFileSync(
          filePath,
          "binary"
        );

        const zip = getZip(content);

        const doc = getDocx(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render(transformArrayToObject(fields));

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });

        fs.writeFileSync(path.resolve(OUTPUT_PATH, fileName), buf);

        return path.resolve(OUTPUT_PATH, fileName);
    }
}