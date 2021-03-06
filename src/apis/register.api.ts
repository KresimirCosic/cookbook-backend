import express from "express";
import bcrypt from "bcrypt";
import * as moment from "moment";

import { connection } from "../sql/connection.sql";
import { saltStrength } from "../utils/startup.util";

export const register = express.Router();

register.post("/", (request, response) => {
  const { username, email, password } = request.body;

  connection.query(
    `SELECT * FROM user WHERE email = \'${email}\';`,
    async (selectUserError, selectUserResult, selectUserFields) => {
      const user = selectUserResult[0];

      // If the email already exists in database
      if (user) {
        response.status(409).json({
          error: true,
          message:
            "User with that email already exists. Please register with another email."
        });
        return;
      }
      // If the email doesn't already exist in database
      else {
        const hashedPassword = await bcrypt.hash(password, saltStrength);

        connection.query(
          `INSERT INTO user VALUES (${null}, ${connection.escape(
            username
          )}, ${connection.escape(email)}, ${connection.escape(
            hashedPassword
          )}, \'${moment
            .default()
            .format("YYYY-MM-DD HH:mm:ss")}\', ${0}, ${null}, ${null});`,
          (insertUserError, insertUserResult, insertUserFields) => {
            response.status(201).json({
              success: true,
              message: `User ${email} with ID: ${insertUserResult.insertId} has been created.`
            });
          }
        );
      }
    }
  );
});
