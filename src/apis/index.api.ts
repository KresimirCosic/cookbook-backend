import express from "express";
import { register } from "./register.api";
import { login } from "./login.api";
import { logout } from "./logout.api";
import { ingredients } from "./ingredients.api";
import { recipes } from "./recipes.api";

export const api = express.Router();

api.use("/register", register);
api.use("/login", login);
api.use("/logout", logout);
api.use("/ingredients", ingredients);
api.use("/recipes", recipes);
