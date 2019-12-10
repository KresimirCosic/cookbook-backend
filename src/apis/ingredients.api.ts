import express from "express";

import { connection } from "../sql/connection.sql";

export const ingredients = express.Router();

// Fetching user's ingredients based on request cookie
ingredients.get("/", (request, response) => {
  // User ID and login session key that are stored in the cookies of the request
  const { UID, SK } = request.cookies;

  connection.query(
    `SELECT * FROM user WHERE user_id = ${UID}`,
    (validationError, validationResult, validationFields) => {
      // If the session key provided in the request cookie is equal to the one stored in the database after last login
      if (SK === validationResult[0].login_session_key) {
        // Using the UID from the request cookie to get the appropriate ingredients for the user
        connection.query(
          `SELECT im.name as name, ui.amount_available as amount, m.name as unit
        FROM user u
        JOIN user_ingredient ui
          USING (user_id)
        JOIN ingredient_measure im
          USING (ingredient_measure_id)
        JOIN measure m
          USING (measure_id)
        WHERE user_id = ${UID}`,
          (
            selectIngredientsError,
            selectIngredientsResult,
            selectIngredientFields
          ) => {
            response.status(200).json({
              success: true,
              message: "Successfully fetched your ingredients.",
              ingredients: selectIngredientsResult
            });
          }
        );
      }
      // If the session key provided in the request cookie is not equal to the one stored in the database after last login
      else {
        response.status(401).json({
          error: true,
          message: "Something went wrong, please login again."
        });
      }
    }
  );
});

// Creating a new ingredient entry or entering user's ingredient and the amount available (depending on the request body)
ingredients.post("/", (request, response) => {
  const { UID, SK } = request.cookies;
  // Boolean from the request body telling the backend if it's a completely new entry or user's available ingredient amount
  const { newIngredient }: { newIngredient: boolean } = request.body;

  connection.query(
    `SELECT * FROM user where user_id = ${UID};`,
    (validationError, validationResult, validationFields) => {
      // If the session key provided in the request cookie is equal to the one stored in the database after last login
      if (SK === validationResult[0].login_session_key) {
        // If it is a completely new ingredient entry
        if (newIngredient) {
          const {
            measureID,
            newIngredientName
          }: { measureID: number; newIngredientName: string } = request.body;

          connection.query(
            `INSERT INTO ingredient_measure VALUES (${null}, ${connection.escape(
              newIngredientName
            )}, ${connection.escape(measureID)});`,
            (
              newIngredientEntryError,
              newIngredientEntryResult,
              newIngredientEntryFields
            ) => {
              response.status(201).json({
                success: true,
                message: "Successfully created a new ingredient entry."
              });
            }
          );
        }

        // If it's a user's ingredient, that means the ingredient exists in database, backend just receives which ingredient and amount available
        else {
          const {
            ingredientMeasureID,
            amountAvailable
          }: {
            ingredientMeasureID: number;
            amountAvailable: number;
          } = request.body;

          const { UID } = request.cookies;

          connection.query(
            `INSERT INTO user_ingredient VALUES (${null}, ${connection.escape(
              UID
            )}, ${connection.escape(ingredientMeasureID)}, ${connection.escape(
              amountAvailable
            )});`,
            (
              newUserIngredientError,
              newUserIngredientResult,
              newUserIngredientFields
            ) => {
              response.status(201).json({
                success: true,
                message: "Successfully created a new user ingredient."
              });
            }
          );
        }
      }
    }
  );
});
