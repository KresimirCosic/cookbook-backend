import express from "express";
import bcrypt from "bcrypt";
import * as moment from "moment";
import { connection } from "../sql/connection.sql";
import { Session } from "../utils/session.util";
import { cookieOptions } from "../utils/startup.util";

export const login = express.Router();

login.post("/", (request, response) => {
  const { email, password } = request.body;

  connection.query(
    `SELECT * FROM user WHERE email = \'${email}\';`,
    async (selectUserError, selectUserResult, selectUserFields) => {
      const user = selectUserResult[0];

      // User exists
      if (user) {
        const passwordMatches = await bcrypt.compare(password, user.password);

        // User still has not been verified
        if (!user.verified) {
          response.status(403).json({
            status: 403,
            message: `User has not yet confirmed the registration link sent to the email: ${email}`
          });
          return;
        }
        // User is verified, but the passwords do not match
        else if (!passwordMatches) {
          response.status(401).json({
            status: 401,
            message: "Please check your password."
          });
          return;
        }
        // User verified and password matches
        else {
          const session = new Session();
          const sessionKey = await session.generateKey();

          connection.query(
            `UPDATE user SET last_login = \'${moment
              .default()
              .format(
                "YYYY-MM-DD HH:mm:ss"
              )}\', login_session_key = \'${sessionKey}\' WHERE email = \'${email}\';`,
            async (setLoginError, setLoginResult, setLoginFields) => {
              // Sending session key in the cookie
              response.cookie("SK", sessionKey, cookieOptions);
              // Sending user ID in the cookie
              response.cookie("UID", user.user_id, cookieOptions);
              // Sending basic information in the response
              response.status(200).json({
                status: 200,
                email: user.email,
                lastLogin: user.last_login
                  ? user.last_login
                  : "You have never logged in before"
              });
            }
          );
        }
      }
      // User does not exist
      else {
        response.status(404).json({
          status: 404,
          message: `No user with that email: ${email}`
        });
        return;
      }
    }
  );
});
