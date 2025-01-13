import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EffortRecordService } from './effort-record.service';
import { CreateEffortRecordDto } from './dto/create-effort-record.dto';
import { UpdateEffortRecordDto } from './dto/update-effort-record.dto';

@Controller('effort-record')
export class EffortRecordController {
  constructor(private readonly effortRecordService: EffortRecordService) {}

  @Post()
  create(@Body() createEffortRecordDto: CreateEffortRecordDto) {
    return this.effortRecordService.create(createEffortRecordDto);
  }

  @Get()
  findAll() {
    return this.effortRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.effortRecordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEffortRecordDto: UpdateEffortRecordDto) {
    return this.effortRecordService.update(+id, updateEffortRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.effortRecordService.remove(+id);
  }
}
