import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { pathToRegexp } from 'path-to-regexp';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private globalWhiteList = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.globalWhiteList = [].concat(
      this.configService.get('perm.router.whitelist') ?? [],
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('请先登录');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('jwt.secret'),
      });
      request['user'] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('登录已过期，请重新登录');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  checkWhiteList(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest() as Request;

    const i = this.globalWhiteList.findIndex((route) => {
      // 请求类型相同
      if (req.method.toUpperCase() === route.method.toUpperCase()) {
        // 对比 url
        return !!pathToRegexp(route.path).exec(req.url);
      }
      return false;
    });

    return i > -1;
  }
}
