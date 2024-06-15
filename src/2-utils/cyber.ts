import jwt, { SignOptions } from "jsonwebtoken";
import { UserModel } from "../3-models/user-model";

class Cyber {
  // generate new JWT toekn:
  public generateNewToken(user: UserModel): string {
    // remove password:
    delete user.password;

    // user constainer:
    const container = { user };

    // expires:
    const options: SignOptions = { expiresIn: "3h" };

    // secret key:
    const secretKey = "TheAmazing4578-99Students!";

    // create:
    const token = jwt.sign(container, secretKey, options);

    // return:
    return token;
  }
}

export const cyber = new Cyber();
