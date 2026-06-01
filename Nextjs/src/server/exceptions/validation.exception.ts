
export class ValidationException
  extends Error {

  constructor(
    message = "Validation failed"
  ) {

    super(message);

    this.name =
      "ValidationException";
  }

}
