import express from "express";
import * as fs from "fs";
import path from "path";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import {sequelize} from "./infrastructure/db/db";
import {uploads} from "./presentation/api/middlewares/storage";
import { OUTPUT_PATH, UPLOADS_PATH } from "./business-logic/consts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname));

app.post("/download", uploads.single("file"), async (req, res, next) => {
  console.log(UPLOADS_PATH, OUTPUT_PATH)
  if (!req.file) {
    return res.status(400).json({message: "Файл не передан"})
  }

  const fileName = req.file.originalname;
  const filePath = path.resolve(UPLOADS_PATH, fileName)

  const content = fs.readFileSync(
    filePath,
    "binary"
  );


  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({ 'first_name': req.body['first_name'], 'last_name': req.body['last_name'] });

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
   });

  fs.writeFileSync(path.resolve(OUTPUT_PATH, fileName), buf);

  res.sendFile(path.resolve(__dirname, fileName));
})

app.get('/', (req, res) => {
  const indexPath = __dirname + 'index.html'; // Путь к вашему index.html файлу
  res.sendFile(indexPath);
})

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(3000, () => console.log("START 3000"))
  } catch (e) {
      console.log(e)
  }
}

start();
