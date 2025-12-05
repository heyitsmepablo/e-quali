import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from 'src/common/errors/domain-error';

@Catch()
export class DomainErrorFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    let status!: number;

    switch (exception.code) {
      case 'RECORD_NOT_FOUND':
        status = 404;
        break;
      case 'UNAUTHORIZED':
        status = 401;
        break;
      default:
        status = 500;
        break;
    }

    response.status(status).json({
      message: exception.message,
    });
  }
}
