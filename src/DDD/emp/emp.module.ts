import { Module } from '@nestjs/common';
import { EmpService } from './emp.service';
import { EmpController } from './emp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpEntity } from './entities/emp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmpEntity])],
  controllers: [EmpController],
  providers: [EmpService],
})
export class EmpModule {}
