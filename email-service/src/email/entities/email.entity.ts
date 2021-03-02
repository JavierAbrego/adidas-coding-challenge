import { IsNotEmpty } from 'class-validator';

export class Email {
  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  content: string;
}
