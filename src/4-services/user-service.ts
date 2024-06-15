import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { UserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";
import { cyber } from "../2-utils/cyber";

class UserService {
  public async register(user: UserModel) {
    // validation...
    // user.validate();
  
    //  sql:
    const sql = "INSERT INTO users VALUES(default, ?, ?, ?, ?, ?)";

    // set role as regular user and not something else:
    user.role = Role.User;

    // values:
    const values = [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.role,
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
}

export const userService = new UserService();
