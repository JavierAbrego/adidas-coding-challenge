import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SubscribeService } from './subscribe/subscribe.service';
import { HttpModule } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [SubscribeService],
      imports: [HttpModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('subscribe should exists"', () => {
    expect(appController.subscribe).toBeDefined();
  });

  it('unsubscribe should exists"', () => {
    expect(appController.unsubscribe).toBeDefined();
  });
});
