import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto, projectDto, projectListDto } from './project.dto';
import { commonCreateUpdateResponseDto, ResponseDto } from 'src/common/dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  async create(
    dto: CreateProjectDto,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    await this.checkCreateDuplicates(dto);

    const result = await this.projectRepo.crateProject(dto);

    return {
      data: {
        id: result.id,
        message: 'Project created successfully',
      },
      metaData: {},
    };
  }

  async update(
    id: number,
    dto: Partial<CreateProjectDto>,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    const project = await this.projectRepo.projectDetails(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.checkUpdateDuplicates(id, dto);

    await this.projectRepo.updateProject(id, dto);

    return {
      data: {
        id: id,
        message: 'Project updated successfully',
      },
      metaData: {},
    };
  }
  private async checkCreateDuplicates(dto: CreateProjectDto) {
    const fields: (keyof CreateProjectDto)[] = ['name', 'location'];

    for (const field of fields) {
      const value = dto[field];

      if (!value) continue;

      const existing = await this.projectRepo.findProjectByField(field, value);

      if (existing?.length > 0) {
        throw new ConflictException(`${String(field)} already exists`);
      }
    }
  }
  private async checkUpdateDuplicates(
    id: number,
    dto: Partial<CreateProjectDto>,
  ) {
    const fields: (keyof CreateProjectDto)[] = ['name', 'location'];

    for (const field of fields) {
      const value = dto[field];

      if (!value) continue;

      const existing = await this.projectRepo.findProjectByField(field, value);

      const isDuplicate = existing?.some((item) => item.id !== id);

      if (isDuplicate) {
        throw new ConflictException(`${String(field)} already exists`);
      }
    }
  }

  async details(id: number): Promise<ResponseDto<projectDto>> {
    const result = await this.projectRepo.projectDetails(id);

    if (!result) {
      throw new NotFoundException('Project not found');
    }

    return {
      data: this.mapProject(result),
      metaData: {},
    };
  }
  async listProject(dto: projectListDto): Promise<ResponseDto<projectDto[]>> {
    const [result, count] = await this.projectRepo.projectList(dto);

    return {
      data: result.map((x) => this.mapProject(x)),
      metaData: {
        total: count,
        page: dto.page,
        limit: dto.limit,
      },
    };
  }
  private mapProject(result: Project) {
    return {
      id: result?.id,
      name: result?.name,
      location: result?.location,
      status: result?.status,
    };
  }
}
