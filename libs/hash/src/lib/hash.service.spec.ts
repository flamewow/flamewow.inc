import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';

describe('HashPasswordService', () => {
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Logger],
      providers: [HashService],
    })
      .setLogger(console)
      .compile();

    service = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate 222 chars pass hash string', async () => {
    const passwordHash = await service.getHash('qwerty');
    expect(passwordHash.length).toEqual(222);
  });
});
