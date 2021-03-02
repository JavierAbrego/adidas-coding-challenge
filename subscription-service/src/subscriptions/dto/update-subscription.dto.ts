import { IsNotEmpty } from 'class-validator';
import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

export class UpdateSubscriptionDto {
  @IsNotEmpty()
  id: Uuid;

  @IsNotEmpty()
  subscribed: boolean;
}
