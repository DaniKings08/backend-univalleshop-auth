import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../../application/commands/register-user.command';
import { LoginUserCommand } from '../../application/commands/login-user.command';
import { RegisterUserDto, LoginUserDto } from '../../application/dtos/auth.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<void> {
    await this.commandBus.execute(
      new RegisterUserCommand(dto.email, dto.password),
    );
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<{ token: string }> {
    const token = await this.commandBus.execute(
      new LoginUserCommand(dto.email, dto.password),
    );
    return { token };
  }
}