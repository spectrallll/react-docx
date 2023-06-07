import multer from "multer";
import fs from "fs";
import path from "path";
import { UPLOADS_PATH } from "../../../../business-logic/consts";

export function createStorage(storageName: string) {
    const storage = multer.diskStorage({
        destination: (_, __, cb) => {
            if (!fs.existsSync(path.resolve(UPLOADS_PATH)))
            {
                fs.mkdirSync(path.resolve(UPLOADS_PATH));
            }
            cb(null, storageName);
        },
        filename: (_, file, cb) => {
            cb(null, file.originalname);
        },
    });

    return multer({ storage });
}

export const uploads = createStorage("uploads");