import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeService } from './subscribe.service';
import { HttpModule } from '@nestjs/common';

describe('SubscribeService', () => {
  let service: SubscribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribeService],
      imports: [HttpModule],
    }).compile();

    service = module.get<SubscribeService>(SubscribeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
