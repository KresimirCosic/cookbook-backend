import https from "https";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { enableSSL, ISSLOptions } from "./ssl/options";
import { startup, NODE_ENV } from "./utils/startup.util";
import { api } from "./apis/index.api";

// Global variables
let PROTOCOL: "http" | "https";
let PORT: 8080 | 8443;
const HOSTNAME = "localhost";

const app = express();

app.use(cookieParser());
// This middleware allows me to send requests in JSON format so the server parses the request properly.
app.use(express.json());

if (NODE_ENV === "development") {
  // Development phase
  PROTOCOL = "http";
  PORT = 8080;

  // To enable cross-origin requests - I am sending API requests from https://localhost:3000 as it is standard with (SSL/TLS enabled) create-react-app
  app.use(cors());

  app.listen(PORT, () => startup(PROTOCOL, HOSTNAME, PORT));
} else {
  // Production phase
  PROTOCOL = "https";
  PORT = 8443;
  const SSLOptions: ISSLOptions = enableSSL();

  // Serving static content from the static folder - which is just a built frontend (i.e. create-react-app build)
  app.use(express.static(path.resolve(__dirname, "../static")));

  https
    .createServer(SSLOptions, app)
    .listen(PORT, () => startup(PROTOCOL, HOSTNAME, PORT));
}

// API route
app.use("/api", api);
