import express from "express";

import { connection } from "../sql/connection.sql";

export const ingredients = express.Router();

ingredients.get("/", (request, response) => {
  // User ID and login session key that are stored in the cookies of the request
  const { UID, SK } = request.cookies;

  connection.query(
    `SELECT * FROM user WHERE user_id = ${UID}`,
    async (validationError, validationResult, validationFields) => {
      // If the session key provided in the request cookie is equal to the one stored in the database after last login
      if (SK === validationResult[0].login_session_key) {
        response.status(200).json({
          status: 200,
          data: validationResult[0]
        });
      }
      // If the session key provided in the request cookie is not equal to the one stored in the database after last login
      else {
        response.status(401).json({
          status: 401,
          message: "Something went wrong, please login again."
        });
      }
    }
  );
});
