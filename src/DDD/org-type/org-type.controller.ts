import { Controller } from '@nestjs/common';
import { OrgTypeService } from './org-type.service';

@Controller('org-type')
export class OrgTypeController {
  constructor(private readonly orgTypeService: OrgTypeService) {}
}
