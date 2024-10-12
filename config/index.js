const dev = process.env.NODE_ENV !== "production";
export const BASEPATH = dev
  ? "https://taciti.coinage.host/"
  : "https://taciti.coinage.host/";
