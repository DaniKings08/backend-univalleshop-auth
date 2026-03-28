import { Command } from '@nestjs/cqrs';

export class RegisterUserCommand extends Command<void> {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }
}