import { Module } from '@nestjs/common';
import { EffortRecordService } from './effort-record.service';
import { EffortRecordController } from './effort-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EffortRecordEntity } from './entities/effort-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EffortRecordEntity])],
  controllers: [EffortRecordController],
  providers: [EffortRecordService],
})
export class EffortRecordModule {}
