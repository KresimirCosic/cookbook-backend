import bcrypt from "bcrypt";
import { saltStrength, serverKeyword } from "../utils/startup.util";

interface ISession {
  generateKey: () => Promise<string>;
}

export class Session implements ISession {
  generateKey = async () => {
    return await bcrypt.hash(serverKeyword, saltStrength);
  };
}
