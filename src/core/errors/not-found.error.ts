import { HttpStatus } from '@nestjs/common';
import AppError from './app.error';

class NotFoundException extends AppError {
  constructor(message: string, suberror?: any[]) {
    super(message, HttpStatus.NOT_FOUND, NotFoundException.name, suberror);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }

  serializeErrors(): { message: string; status: number; suberrors: any[] }[] {
    return [
      { message: this.message, status: this.status, suberrors: this.suberror },
    ];
  }
}

export default NotFoundException;
