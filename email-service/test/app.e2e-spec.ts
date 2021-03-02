import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/email/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/email')
      .set('apiKey', 'test')
      .expect(201);
    expect(response.body.sent).toBe(true);
    return response;
  });
  it('error code 401 when no token is retrieved /email/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/email')
      .expect(401);
    return response;
  });
});
