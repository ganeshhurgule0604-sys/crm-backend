import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, projectListDto } from './project.dto';
import { ResponseDto, commonCreateUpdateResponseDto } from 'src/common/dto';
import { projectDto } from './project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(
    @Body() dto: CreateProjectDto,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    return this.projectService.create(dto);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: Partial<CreateProjectDto>,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    return this.projectService.update(id, dto);
  }
  @Get(':id')
  details(@Param('id') id: number): Promise<ResponseDto<projectDto>> {
    return this.projectService.details(id);
  }
  @Get()
  list(@Query() dto: projectListDto): Promise<ResponseDto<projectDto[]>> {
    return this.projectService.listProject(dto);
  }
}
