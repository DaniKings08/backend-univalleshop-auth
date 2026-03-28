import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUserHandler } from './application/handlers/register-user.handler';
import { LoginUserHandler } from './application/handlers/login-user.handler';
import { InMemoryUserRepository } from './infrastructure/adapters/in-memory-user-repository.adapter';

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: InMemoryUserRepository,
    },
    RegisterUserHandler,
    LoginUserHandler,
  ],
  exports: ['IUserRepository'],
})
export class AuthModule {}