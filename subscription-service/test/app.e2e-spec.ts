import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('SubscriptionsController (e2e)', () => {
  let app: INestApplication;
  let id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/subscriptions/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/subscriptions/')
      .send({
        email: 'myemail@gmail.com',
        dateOfBirth: new Date(1988, 2, 26).getTime(),
        newsletterId: '123',
        consent: true,
      })
      .set('Accept', 'application/json')
      .set('apiKey', 'test')
      .expect(201);
    id = response.body.id;
  });

  it(`/subscriptions/:id (GET)`, async () => {
    const response = await request(app.getHttpServer())
      .get(`/subscriptions/${id}`)
      .set('apiKey', 'test')
      .expect(200);
    expect(response.body.id).toBe(id);
  });

  it(`/subscriptions/ (GET)`, async () => {
    const response = await request(app.getHttpServer())
      .get(`/subscriptions/`)
      .set('apiKey', 'test')
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it(`/subscriptions/ (PUT)`, async () => {
    const response = await request(app.getHttpServer())
      .put(`/subscriptions/`)
      .set('apiKey', 'test')
      .send({ id, subscribed: false })
      .expect(200);
    expect(response.body.subscribed).toBe(false);
  });

  it(`error code 401 when there's no auth token /subscriptions/ (GET)`, async () => {
    await request(app.getHttpServer()).get(`/subscriptions/`).expect(401);
  });

  it(`error 400 when email is not valid /subscriptions/ (POST)`, async () => {
    await request(app.getHttpServer())
      .post('/subscriptions/')
      .send({
        email: '12345',
        dateOfBirth: new Date(1988, 2, 26).getTime(),
        newsletterId: '123',
        consent: true,
      })
      .set('Accept', 'application/json')
      .set('apiKey', 'test')
      .expect(400);
  });

  it(`error 400 when mandatory params are not included /subscriptions/ (POST)`, async () => {
    await request(app.getHttpServer())
      .post('/subscriptions/')
      .send({
        email: '12345',
        newsletterId: '123',
        consent: true,
      })
      .set('Accept', 'application/json')
      .set('apiKey', 'test')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
