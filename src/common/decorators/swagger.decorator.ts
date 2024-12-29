import { applyDecorators } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
export const API_SECURITY_AUTH = 'auth';

export const ApiBearerAuth = () => {
  return applyDecorators(ApiSecurity(API_SECURITY_AUTH));
};
