import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { CommonStatusEnum } from '@/common/entity/common.entity';
import { Repository } from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRep: Repository<TenantEntity>,
  ) {}
  async create(createTenantDto: CreateTenantDto) {
    const { name, status = CommonStatusEnum.ENABLE } = createTenantDto;
    const tenant = this.tenantRep.create({
      name,
      status,
      createBy: 0,
      updateBy: 0,
    });
    const res = await tenant.save();
    return res;
  }

  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
