import {HttpModule, Module} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { CassandraService } from '../cassandra/cassandra.service';
import { EmailService } from '../email/email.service';

@Module({
  imports: [HttpModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, CassandraService, EmailService],
})
export class SubscriptionsModule {}
