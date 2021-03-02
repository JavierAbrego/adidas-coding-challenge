import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

describe('SubscriptionsController', () => {
  let controller: SubscriptionsController;
  let subscriptionsService: SubscriptionsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionsController],
      providers: [
        {
          provide: SubscriptionsService,
          useFactory: () => ({
            create: jest.fn(() => true),
            findAll: jest.fn(() => true),
            findOne: jest.fn(() => true),
            update: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    controller = module.get<SubscriptionsController>(SubscriptionsController);
    subscriptionsService = module.get(SubscriptionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should call subscriptionService', () => {
    const params = {
      email: 'myemail@gmail.com',
      consent: true,
      newsletterId: '123',
      dateOfBirth: BigInt(10),
      firstName: '',
      gender: '',
    };
    controller.create(params);
    expect(subscriptionsService.create).toBeCalledWith(params);
  });

  it('findAll should call subscriptionService', () => {
    controller.findAll();
    expect(subscriptionsService.findAll).toBeCalled();
  });

  it('findOne should call subscriptionService', () => {
    const id = 'id';
    controller.findOne(id);
    expect(subscriptionsService.findOne).toBeCalledWith(id);
  });

  it('update should call subscriptionService', () => {
    const params = { id: Uuid.random(), subscribed: false };
    controller.update(params);
    expect(subscriptionsService.update).toBeCalledWith(params);
  });
});
