import { Controller } from '@nestjs/common';
import { EmpPostService } from './emp-post.service';

@Controller('emp-post')
export class EmpPostController {
  constructor(private readonly empPostService: EmpPostService) {}
}
