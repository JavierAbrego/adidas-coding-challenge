import { HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { SubscribeService } from './subscribe/subscribe.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [SubscribeService],
})
export class AppModule {}
