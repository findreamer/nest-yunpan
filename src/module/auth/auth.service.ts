import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { isEmpty } from 'lodash';
import { BusinessException } from '@/common/exceptions/biz.exception';
import { ErrorEnum } from '@/common/constant';
import { md5 } from '@/utils';
import { TokenService } from './services/token.service';
import { RoleService } from '../system/role/role.service';
import { genAuthPVKey, genAuthTokenKey } from '@/utils/genRedisKey';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@/common/decorators/inject.redis.dectors';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly roleService: RoleService,
    private readonly configService: ConfigService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async createToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  /**
   * 获取登录JWT
   * 返回null则账号密码有误，不存在该用户
   */
  async login(username: string, password: string, ip: string, ua: string) {
    const user = await this.userService.findByUsername(username);
    if (isEmpty(user)) {
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD);
    }

    const comparePassword = md5(`${password}${user.paslt}`);
    if (comparePassword !== user.password) {
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD);
    }

    // 角色信息
    const roleIds = await this.roleService.getRoleIdsByUser(user.id);
    const roles = await this.roleService.getRoleValues(roleIds);

    // 包含access_token和refresh_token
    const token = await this.tokenService.generateAccessToken(user.id, roles);
    await this.redis.set(
      genAuthTokenKey(user.id),
      token.accessToken,
      'EX',
      this.configService.get('jwt.expire'),
    );

    // 设置密码版本号 当密码修改时，版本号+1
    await this.redis.set(genAuthPVKey(user.id), 1);

    // todo
    // 设置菜单权限
    // const permissions = await this.menuService.getPermissions(user.id)
    // await this.setPermissionsCache(user.id, permissions)

    // await this.loginLogService.create(user.id, ip, ua)

    return token.accessToken;
  }
}
