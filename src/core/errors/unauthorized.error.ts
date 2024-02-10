import { HttpStatus } from '@nestjs/common';
import AppError from './app.error';

class UnauthorizedError extends AppError {
  constructor(message: string, suberror?: any[]) {
    super(message, HttpStatus.UNAUTHORIZED, UnauthorizedError.name, suberror);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors(): { message: string; status: number; suberrors: any[] }[] {
    return [
      { message: this.message, status: this.status, suberrors: this.suberror },
    ];
  }
}

export default UnauthorizedError;
