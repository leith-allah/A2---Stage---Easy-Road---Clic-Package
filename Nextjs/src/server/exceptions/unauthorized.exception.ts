
export class UnauthorizedException
extends Error {

  status = 401;

  constructor(
    message = "Non authentifié"
  ) {

    super(message);

    this.name =
      "UnauthorizedException";
  }
}
