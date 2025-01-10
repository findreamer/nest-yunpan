import { Module } from '@nestjs/common';
import { OrgTypeService } from './org-type.service';
import { OrgTypeController } from './org-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgTypeEntity } from './entities/org-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrgTypeEntity])],
  controllers: [OrgTypeController],
  providers: [OrgTypeService],
})
export class OrgTypeModule {}
