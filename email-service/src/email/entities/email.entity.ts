import {IsNotEmpty, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Email {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'newsletter@adidas.com',
    description: 'The email address from where the email is sent.',
  })
  from: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'subscribedemail@gmail.com',
    description: 'The email address to where the email is sent.',
  })
  to: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'February newsletter',
    description: 'The subject of the email',
  })
  subject: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Content',
    description: 'The content of the email',
  })
  content: string;
}
