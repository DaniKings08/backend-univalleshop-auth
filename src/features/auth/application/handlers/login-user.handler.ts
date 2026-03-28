import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LoginUserCommand } from '../commands/login-user.command';
import type { IUserRepository } from '../../domain/interfaces/i-user-repository';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: LoginUserCommand): Promise<string> {
    const { email, password } = command;

    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    // Verify password (in real implementation, compare hash)
    if (user.password.hashedValue !== password) {
      throw new Error('Invalid credentials');
    }

    // Return JWT or token
    return 'mock-jwt-token';
  }
}