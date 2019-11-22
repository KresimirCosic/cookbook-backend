import express from "express";
import bcrypt from "bcrypt";
import * as moment from "moment";
import { connection } from "../sql/connection.sql";

export const login = express.Router();

login.post("/", (request, response) => {
  response.send("/api/login");
});
