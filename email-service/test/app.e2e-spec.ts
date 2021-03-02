import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(' error code 400 when required date is not sent /email/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/email')
      .set('apiKey', 'test')
      .expect(400);
    expect(response.body.sent).toBeFalsy();
    return response;
  });
  it('error code 401 when no token is retrieved /email/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/email')
      .expect(401);
    return response;
  });
});
