/*
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no
[req_distinguished_name]
C = HR
ST = .
L = Tenja
O = .
OU = . 
CN = www.localhost.com
[v3_req]
keyUsage = critical, digitalSignature, keyAgreement
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = www.localhost.com
DNS.2 = localhost.com
DNS.3 = localhost
*/

/*
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256
*/
import fs from "fs";
import path from "path";

export interface ISSLOptions {
  key: Buffer;
  cert: Buffer;
}

export const enableSSL = () => {
  const SSLOptions = {
    key: fs.readFileSync(path.resolve(__dirname, "./cert.key")),
    cert: fs.readFileSync(path.resolve(__dirname, "./cert.pem"))
  };

  return SSLOptions;
};
