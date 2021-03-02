import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { Email } from './entities/email.entity';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  send(@Body() email: Email) {
    return this.emailService.send(email);
  }
}
