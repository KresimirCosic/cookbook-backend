import express from "express";

export const logout = express.Router();

logout.post("/", (request, response) => {
  response.clearCookie("SK");
  response.clearCookie("UID");
  response.status(204).send();
});
