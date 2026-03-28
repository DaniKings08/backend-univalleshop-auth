export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

export class ApplicationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApplicationException';
  }
}