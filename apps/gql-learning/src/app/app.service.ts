import { HashService } from '@flamewow.inc/hash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private hashService: HashService) {}
  async getData(): Promise<{ message: string }> {
    const password = await this.hashService.getHash('password');

    return { message: `Welcome to gql-learning! ${password}` };
  }
}
