import express from "express";
import bcrypt from "bcrypt";
import * as moment from "moment";
import { connection } from "../sql/connection.sql";

export const register = express.Router();

register.post("/", (request, response) => {
  response.send("/api/register");
});
