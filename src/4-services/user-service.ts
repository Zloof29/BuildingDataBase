import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { UserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError } from "../3-models/client-error";

class UserService {
  public async register(user: UserModel) {
    // validation...
    user.insertUserValidate();

    //  sql:
    const sql = "INSERT INTO users VALUES(default, ?, ?, ?, ?, ?)";

    // set role as regular user and not something else:
    user.roleId = Role.User;

    // values:
    const values = [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ];

    // execute:
    const info: OkPacketParams = await dal.execute(sql, values);

    // set back id:
    user.id = info.insertId;

    // create JWT (JSON WEB TOKEN):
    const token = cyber.generateNewToken(user);

    // return
    return token;
  }

  public async login(credentials: CredentialsModel) {
    // validation....
    // user.validation...

    // sql
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    // value:
    const values = [credentials.email, credentials.password];

    // execute
    const users: OkPacketParams = await dal.execute(sql, values);

    // extract user:
    const user = users[0];

    // if no user:
    if (!user) throw new UnauthorizedError("Incorrect email or password");

    // create JWT (JSON WEB TOKEN):
    const token = cyber.generateNewToken(user);

    // return
    return token;
  }
}

export const userService = new UserService();
