import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { jwtConstants } from './constants';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [ MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  }), TypeOrmModule.forFeature([UserEntity]),JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  }),],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
