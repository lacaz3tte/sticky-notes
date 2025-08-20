export class HttpException extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
    public readonly details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request', details?: any) {
    super(message, 400, details);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(message, 404);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflict') {
    super(message, 409);
  }
}