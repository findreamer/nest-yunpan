import { PartialType } from '@nestjs/mapped-types';
import { CreateEffortRecordDto } from './create-effort-record.dto';

export class UpdateEffortRecordDto extends PartialType(CreateEffortRecordDto) {}
