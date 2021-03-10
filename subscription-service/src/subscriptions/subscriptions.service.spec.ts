import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from './subscriptions.service';
import { CassandraService } from '../cassandra/cassandra.service';
import { EmailService } from '../email/email.service';
import { HttpModule } from '@nestjs/common';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionsService, CassandraService, EmailService],
      imports: [HttpModule],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
