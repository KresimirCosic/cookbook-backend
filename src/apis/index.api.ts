import express from "express";
import { register } from "./register.api";
import { login } from "./login.api";

export const api = express.Router();

api.use("/register", register);
api.use("/login", login);
