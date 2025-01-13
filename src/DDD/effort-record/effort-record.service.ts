import { Injectable } from '@nestjs/common';
import { CreateEffortRecordDto } from './dto/create-effort-record.dto';
import { UpdateEffortRecordDto } from './dto/update-effort-record.dto';

@Injectable()
export class EffortRecordService {
  create(createEffortRecordDto: CreateEffortRecordDto) {
    return 'This action adds a new effortRecord';
  }

  findAll() {
    return `This action returns all effortRecord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} effortRecord`;
  }

  update(id: number, updateEffortRecordDto: UpdateEffortRecordDto) {
    return `This action updates a #${id} effortRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} effortRecord`;
  }
}
