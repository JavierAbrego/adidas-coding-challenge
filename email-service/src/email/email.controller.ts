import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { Email } from './entities/email.entity';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiHeader({ name: 'apiKey', example: 'test' })
@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({ summary: 'Sends a new email' })
  @ApiResponse({ status: 201, description: '{"sent": true}' })
  @Post()
  send(@Body() email: Email) {
    return this.emailService.send(email);
  }
}
