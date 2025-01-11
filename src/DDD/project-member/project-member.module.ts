import { Module } from '@nestjs/common';
import { ProjectMemberService } from './project-member.service';
import { ProjectMemberController } from './project-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMemberEntity } from './entities/project-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectMemberEntity])],
  controllers: [ProjectMemberController],
  providers: [ProjectMemberService],
})
export class ProjectMemberModule {}
