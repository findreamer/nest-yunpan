import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('main')
@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @ApiOperation({
    summary: '获取验证码',
  })
  @Get('/captcha')
  getCaptcha() {
    return this.mainService.getCaptcha();
  }
}
