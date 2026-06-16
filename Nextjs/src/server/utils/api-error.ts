
export class ApiError extends Error {

  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);

    this.name = "ApiError";
  }
}


export class NotFoundException
  extends ApiError {

  constructor(
    message: string
  ) {
    super(
      404,
      message,
      "NOT_FOUND"
    );

    this.name =
      "NotFoundException";
  }
}


export class UnauthorizedException
  extends ApiError {

  constructor(
    message = "Non authentifié"
  ) {

    super(
      401,
      message,
      "UNAUTHORIZED"
    );

    this.name =
      "UnauthorizedException";

  }

}


export class ForbiddenException
  extends ApiError {

  constructor(
    message = "Accès interdit"
  ) {

    super(
      403,
      message,
      "FORBIDDEN"
    );

    this.name =
      "ForbiddenException";

  }

}
