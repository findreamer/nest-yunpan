import { Body, Controller, Get, Post } from '@nestjs/common';
import { MainService } from './main.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SendEmailCodeDto } from './dto';

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

  @Post('/sendEmailCode')
  sendEmailCode(@Body() sendEmailCode: SendEmailCodeDto) {
    const { email, code, uuid } = sendEmailCode;
    return this.mainService.sendEmailCode(email, code, uuid);
  }
}
