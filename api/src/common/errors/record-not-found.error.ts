import { DomainError } from './domain-error';

export class RecordNotFoundError extends DomainError {
  constructor(message: string) {
    super('RECORD_NOT_FOUND', message);
  }
}
