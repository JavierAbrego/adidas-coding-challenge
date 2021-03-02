import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let subscriptionId: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/subscribe (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/subscribe')
      .send({
        email: 'myemail@email.com',
        dateOfBirth: 10,
        newsletterId: '123',
        consent: true,
      })
      .expect(201);
    expect(response.body.id).toBeTruthy();
    subscriptionId = response.body.id;
  });
  it('/unsubscribe/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/unsubscribe/${subscriptionId}`)
      .expect(200);
    expect(response).toBeTruthy();
  });
});
