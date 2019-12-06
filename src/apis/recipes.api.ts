import express from "express";

import { connection } from "../sql/connection.sql";

export const recipes = express.Router();

recipes.get("/", (request, response) => {
  console.log(request.cookies);
});
