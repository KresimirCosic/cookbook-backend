import https from "https";
import express from "express";
import path from "path";
import { enableSSL, ISSLOptions } from "./ssl/options";
import { startup } from "./utils/startup.util";
import { api } from "./apis/index.api";

// Global variables
let PROTOCOL: "http" | "https";
let PORT: 8080 | 8443;
const HOSTNAME = "localhost";
const { NODE_ENV } = process.env;

const app = express();

// This middleware allows me to send requests in JSON format so the server parses the request properly.
app.use(express.json());

// API setup
app.use("/api", api);

if (NODE_ENV === "development") {
  // Development phase
  PROTOCOL = "http";
  PORT = 8080;

  app.get("/", (req, res) => res.send("Hello world!"));

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
