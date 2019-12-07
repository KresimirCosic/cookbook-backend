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
        // Using the UID from the request cookie to get the appropriate ingredients for the user
        connection.query(
          `SELECT im.name as ingredient_name, ui.amount_available, m.name as measure_unit
        FROM user u
        JOIN user_ingredient ui
          USING (user_id)
        JOIN ingredient_measure im
          USING (ingredient_measure_id)
        JOIN measure m
          USING (measure_id)
        WHERE user_id = ${UID}`,
          async (
            selectIngredientsError,
            selectIngredientsResult,
            selectIngredientFields
          ) => {
            response.status(200).json({
              status: 200,
              ingredients: selectIngredientsResult
            });
          }
        );
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
