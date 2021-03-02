import { HttpService, Injectable } from '@nestjs/common';
import { EMAIL_MESSAGES } from './messages.constants';

@Injectable()
export class EmailService {
  //TODO: this could be retrieved from a config server
  EMAIL_ENDPOINT =
    process.env.NODE_ENV !== 'production'
      ? 'http://127.0.0.1:3001'
      : 'http://email-service:3001';
  EMAIL_API_KEY = process.env.EMAIL_API_KEY || 'test';

  constructor(private httpService: HttpService) {}
  sendSubscribedEmail(recipient: string) {
    const email = {
        from: EMAIL_MESSAGES.SUBSCRIBED_EMAIL_SENDER,
        to: recipient,
        subject: EMAIL_MESSAGES.SUBSCRIBED_EMAIL_SUBJECT,
        content: EMAIL_MESSAGES.SUBSCRIBED_EMAIL_CONTENT,
      },
      config = {
        headers: {
          apiKey: this.EMAIL_API_KEY,
        },
      };
    return this.httpService
      .post(`${this.EMAIL_ENDPOINT}/email`, email, config)
      .toPromise();
  }
}
