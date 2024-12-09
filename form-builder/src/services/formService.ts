// backend/src/services/formService.ts
import { pool } from "./db"; // Database connection pool

export const createForm = async (formData: any) => {
  const { title, description, fields } = formData;
  const result = await pool.query(
    "INSERT INTO forms (title, description) VALUES (?, ?)",
    [title, description]
  );
  const formId = result.insertId;

  for (const field of fields) {
    await pool.query(
      "INSERT INTO fields (form_id, type, label, placeholder) VALUES (?, ?, ?, ?)",
      [formId, field.type, field.label, field.placeholder]
    );
  }
  return formId;
};

export const getFormById = async (formId: string) => {
  const [form] = await pool.query("SELECT * FROM forms WHERE id = ?", [formId]);
  const fields = await pool.query("SELECT * FROM fields WHERE form_id = ?", [
    formId,
  ]);
  return { ...form, fields };
};
