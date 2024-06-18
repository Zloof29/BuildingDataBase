import { ValitationError } from "./client-error";
import { Role } from "./enums";
import Joi from "joi";

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: Role;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  private static insertUserValidate = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().required().min(1).max(50),
    lastName: Joi.string().required().min(1).max(50),
    email: Joi.string().required().min(10).max(50),
    password: Joi.string().required().min(8).max(50),
  });

  private static updateUserValitation = Joi.object({
    id: Joi.number().required().min(1).integer(),
    firstName: Joi.string().required().min(1).max(50),
    lastName: Joi.string().required().min(1).max(50),
    email: Joi.string().required().min(1).max(50),
    password: Joi.string().required().min(8).max(50),
  });

  public insertUserValidate(): void {
    const result = UserModel.insertUserValidate.validate(this);
    if (result.error) throw new ValitationError(result.error.message);
  }

  public updateUserValidation(): void {
    const result = UserModel.updateUserValitation.validate(this);
    if (result.error) throw new ValitationError(result.error.message);
  }
}
