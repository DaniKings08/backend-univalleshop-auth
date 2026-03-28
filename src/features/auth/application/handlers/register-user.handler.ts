import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterUserCommand } from '../commands/register-user.command';
import type { IUserRepository } from '../../domain/interfaces/i-user-repository';
import { User } from '../../domain/entities/user.entity';
import { Email, Password } from '../../domain/value-objects/email.value-object';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
    const { email, password } = command;

    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create user (hash password in real implementation)
    const user = new User(
      'generated-id', // Use UUID
      new Email(email),
      new Password(password), // Hash here
    );

    await this.userRepository.save(user);
  }
}