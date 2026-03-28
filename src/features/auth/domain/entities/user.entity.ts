import { BaseEntity } from '../../../../shared/kernel/base-entity';
import { Email, Password } from '../value-objects/email.value-object';

export class User extends BaseEntity {
  private _email: Email;
  private _password: Password;
  private _isActive: boolean;

  constructor(id: string, email: Email, password: Password) {
    super(id);
    this._email = email;
    this._password = password;
    this._isActive = true;
  }

  get email(): Email {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  updateEmail(newEmail: Email): void {
    this._email = newEmail;
    this.markAsModified();
  }

  deactivate(): void {
    this._isActive = false;
    this.markAsModified();
  }

  // Business logic methods
}