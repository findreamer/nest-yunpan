import { Module } from '@nestjs/common';
import { EmpPostService } from './emp-post.service';
import { EmpPostController } from './emp-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpPostEntity } from './entities/emp-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmpPostEntity])],
  controllers: [EmpPostController],
  providers: [EmpPostService],
})
export class EmpPostModule {}
