import { getDecodedAccessToken } from "../utils/jwt";

export const getUser = () => {
  const decode = getDecodedAccessToken();
  if (decode) {
    return decode;
  } else {
    console.log("Token decode faild");
  }
};
