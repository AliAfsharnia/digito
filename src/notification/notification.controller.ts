import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notification')
export class NotificationController {}
