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
