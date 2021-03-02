import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { CassandraService } from '../cassandra/cassandra.service';
import { Subscription } from './entities/subscription.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class SubscriptionsService implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private emailService: EmailService,
  ) {}

  subscriptionMapper: mapping.ModelMapper<Subscription>;

  onModuleInit(): any {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Subscription: {
          tables: ['subscription'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.subscriptionMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Subscription');
  }
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = Subscription.fromCreateSubscriptionDto(
      createSubscriptionDto,
    );
    await this.subscriptionMapper.insert(subscription);
    await this.emailService.sendSubscribedEmail(subscription.email);
    return subscription;
  }

  async findAll() {
    const cassandraResponse = await this.subscriptionMapper.findAll();
    return cassandraResponse.toArray();
  }

  async findOne(id: string) {
    return (await this.subscriptionMapper.find({ id })).first();
  }

  async update(updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = Subscription.fromUpdateSubscriptionDto(
      updateSubscriptionDto,
    );

    await this.subscriptionMapper.update(subscription, {
      fields: ['id', 'subscribed'],
      ifExists: true,
    });

    return subscription;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
