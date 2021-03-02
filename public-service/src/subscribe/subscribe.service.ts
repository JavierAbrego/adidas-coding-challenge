import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class SubscribeService {
  SUBSCRIBE_ENDPOINT =
    process.env.NODE_ENV !== 'production'
      ? 'http://127.0.0.1:3000'
      : 'http://subscription-service:3000';
  SUBSCRIBE_API_KEY = process.env.SUBSCRIBE_API_KEY || 'test';
  HTTP_CONFIG = {
    headers: {
      apiKey: this.SUBSCRIBE_API_KEY,
    },
  };
  constructor(private httpService: HttpService) {}

  subscribe(subscribeObject: any) {
    return this.httpService
      .post(
        `${this.SUBSCRIBE_ENDPOINT}/subscriptions/`,
        subscribeObject,
        this.HTTP_CONFIG,
      )
      .toPromise();
  }
  unsubscribe(id: string) {
    return this.httpService
      .put(
        `${this.SUBSCRIBE_ENDPOINT}/subscriptions`,
        { id: id, subscribed: false },
        this.HTTP_CONFIG,
      )
      .toPromise();
  }
}
