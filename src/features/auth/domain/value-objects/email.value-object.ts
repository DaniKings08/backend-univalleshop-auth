export class Email {
  private readonly _value: string;

  constructor(value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error('Invalid email format');
    }
    this._value = value;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get value(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }
}

export class Password {
  private readonly _hashedValue: string;

  constructor(hashedValue: string) {
    this._hashedValue = hashedValue;
  }

  get hashedValue(): string {
    return this._hashedValue;
  }
}