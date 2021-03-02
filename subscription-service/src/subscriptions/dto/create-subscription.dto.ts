import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {

  @IsEmail()
  email: string;

  firstName: string;

  gender: string;

  @IsNotEmpty()
  dateOfBirth: bigint;

  @IsNotEmpty()
  consent: boolean;

  @IsNotEmpty()
  newsletterId: string;
}
