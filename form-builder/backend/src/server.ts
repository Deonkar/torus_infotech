// backend/src/server.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { saveForm, getForm } from "./controllers/formController";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/forms", saveForm);
app.get("/api/forms/:formId", getForm);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
