import jwt, { SignOptions } from "jsonwebtoken";
import { UserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";

class Cyber {
  // secret key:
  private secretKey = "TheAmazing4578-99Students!";

  // generate new JWT toekn:
  public generateNewToken(user: UserModel): string {
    // remove password:
    delete user.password;

    // user constainer:
    const container = { user };

    // expires:
    const options: SignOptions = { expiresIn: "3h" };

    // create:
    const token = jwt.sign(container, this.secretKey, options);

    // return:
    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      // if no toekn
      if (!token) return false;

      // verify token
      jwt.verify(token, this.secretKey);

      // token valid
      return true;
    } catch (err: any) {
      // token not valid
      return false;
    }
  }

  // is user admin
  public isAdmin(token: string): boolean {
    try {
      // extract container object from token:
      const container = jwt.decode(token) as { user: UserModel };

      // extract user from container:
      const user = container.user;

      // return true if user is admin or false if not:
      return user.roleId === Role.Admin;
    } catch (err: any) {
      return false;
    }
  }
}

export const cyber = new Cyber();
