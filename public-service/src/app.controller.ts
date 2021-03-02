import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SubscribeService } from './subscribe/subscribe.service';

@Controller()
export class AppController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post('subscribe')
  async subscribe(@Body() subscribeObject: any): Promise<any> {
    try {
      const response = await this.subscribeService.subscribe(subscribeObject);
      if (response && response.data && response.data.id) {
        return { id: response.data.id };
      } else {
        throw new HttpException(
          'Subscribe Id was not retrieved',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      this.handleHttpError(error);
    }
  }
  @Get('unsubscribe/:id')
  async unsubscribe(@Param('id') id: string): Promise<any> {
    try {
      const response = await this.subscribeService.unsubscribe(id);
    } catch (error) {
      this.handleHttpError(error);
    }

    return '';
  }

  handleHttpError(error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.statusCode
    ) {
      const data = error.response.data;
      throw new HttpException(data.message, data.statusCode);
    }
    throw new HttpException(
      'Unexpected Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
