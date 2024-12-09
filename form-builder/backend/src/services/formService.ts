// src/services/formService.ts

import { pool } from "../db"; // Import the database connection pool from db.ts (one directory up)

interface FormData {
  name: string;
  description: string;
}

// Function to create a new form in the database
export const createForm = async (formData: FormData) => {
  try {
    // Insert the form data into the database
    const result = await pool.query(
      "INSERT INTO forms (name, description) VALUES (?, ?)",
      [formData.name, formData.description]
    );

    // Extract the insertId from the result
    const formId = result[0].insertId;

    return { formId, message: "Form created successfully" };
  } catch (error) {
    console.error("Error creating form:", error);
    throw new Error("Error creating form");
  }
};

// Function to get a form by its ID from the database
export const getFormById = async (formId: string) => {
  try {
    // Query to fetch the form by ID
    const result = await pool.query("SELECT * FROM forms WHERE id = ?", [
      formId,
    ]);

    // If the form doesn't exist, return an error message
    if (result[0].length === 0) {
      return { message: "Form not found" };
    }

    // Return the form data
    return result[0][0];
  } catch (error) {
    console.error("Error fetching form by ID:", error);
    throw new Error("Error fetching form by ID");
  }
};
