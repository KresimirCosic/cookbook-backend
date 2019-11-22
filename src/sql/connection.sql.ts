import mysql from "mysql";

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

// MySQL connection to be used throughout the application
export const connection = mysql.createConnection({
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});
