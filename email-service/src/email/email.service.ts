import { Injectable } from '@nestjs/common';
import { Email } from './entities/email.entity';

@Injectable()
export class EmailService {
  send(email: Email) {
    return { sent: true };
  }
}
