export const startup: (
  PROTOCOL: string,
  HOSTNAME: string,
  PORT: number
) => void = (PROTOCOL, HOSTNAME, PORT) => {
  console.log(
    `Server started and listening on ${PROTOCOL}://${HOSTNAME}:${PORT}`
  );
  console.log("To quit press Ctrl+C");
};

export const { NODE_ENV } = process.env;

export const saltStrength = 12;

export const serverKeyword = "AvEmArIa";

export const cookieOptions = {
  httpOnly: true,
  sameSite: NODE_ENV === "development" ? false : true,
  secure: NODE_ENV === "development" ? false : true
};
