
export class ForbiddenException
extends Error {

  status = 403;

  constructor(
    message = "Accès interdit"
  ) {

    super(message);

    this.name =
      "ForbiddenException";
  }
}
