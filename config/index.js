const dev = process.env.NODE_ENV !== "production";
export const BASEPATH = dev
  ? "https://taciti-wp-backend-prd-h3c8hrcfh6hme2fb.southindia-01.azurewebsites.net/"
  : "https://taciti-wp-backend-prd-h3c8hrcfh6hme2fb.southindia-01.azurewebsites.net/";
