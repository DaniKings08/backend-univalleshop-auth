import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/i-user-repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email.value === email) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}