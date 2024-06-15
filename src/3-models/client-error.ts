import { StatusCode } from "./enums";

// class ClientError {
//   public status: number;
//   public message: string;

//   public constructor(public status: number, public message: string) {
//     this.status = status;
//     this.message = message;
//   }
// }

// same as the above!!
// Base class for all client errors:
abstract class ClientError {
  public constructor(public status: number, public message: string) {}
}

// Resource (id) not found error:
export class ResourceNotFoundError extends ClientError {
  public constructor(id: number) {
    super(StatusCode.NotFound, `id ${id} not found.`);
  }
}

export class RouteNotFoundError extends ClientError {
  public constructor(route: string, method: string) {
    super(StatusCode.NotFound, `Rout ${route} on method ${method} not exist.`);
  }
}

// valitadtion error:
export class ValitationError extends ClientError {
  public constructor(message: string) {
    super(StatusCode.BadRequest, message);
  }
}
