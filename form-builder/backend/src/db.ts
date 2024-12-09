// src/db.ts
import mysql from "mysql2";

export const pool = mysql
  .createPool({
    host: "localhost",
    user: "root", // Your MySQL username
    password: "password", // Your MySQL password
    database: "form_builder_db",
  })
  .promise();
