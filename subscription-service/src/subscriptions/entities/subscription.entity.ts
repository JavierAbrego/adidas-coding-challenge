import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

export class Subscription {
  id: types.Uuid;
  email: string;
  firstName: string;
  gender: string;
  dateOfBirth: bigint;
  consent: boolean;
  newsletterId: string;
  subscribed: boolean;

  static fromCreateSubscriptionDto(
    createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const subscription = new Subscription();
    subscription.id = Uuid.random();
    subscription.subscribed = true;
    Object.assign(subscription, createSubscriptionDto);
    return subscription;
  }

  static fromUpdateSubscriptionDto(
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    const subscription = new Subscription();
    Object.assign(subscription, updateSubscriptionDto);
    return subscription;
  }
}
