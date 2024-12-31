import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailCodeEntity } from './entities/email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailCodeEntity])],
  controllers: [MainController],
  providers: [MainService],
  exports: [MainService],
})
export class MainModule {}
