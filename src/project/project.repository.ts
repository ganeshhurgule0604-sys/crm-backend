import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto, projectListDto } from './project.dto';
import { Like } from 'typeorm';

export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  crateProject(dto: CreateProjectDto) {
    const project = this.projectRepository.create(dto);

    return this.projectRepository.save(project);
  }
  updateProject(id: number, dto: Partial<CreateProjectDto>) {
    return this.projectRepository.update(id, dto);
  }
  projectDetails(id: number) {
    return this.projectRepository.findOneBy({ id });
  }

  projectList(dto: projectListDto) {
    const { name, location, status } = dto;
    const query = this.projectRepository.createQueryBuilder('project');

    if (name) {
      query.andWhere('project.name ILIKE :name', {
        name: `%${name}%`,
      });
    }
    if (location) {
      query.andWhere('project.location ILIKE :location', {
        location: `%${location}%`,
      });
    }
    if (status) {
      query.andWhere({
        status: status,
      });
    }

    return query.getManyAndCount();
  }

  findProjectByField(field: string, value: string) {
    return this.projectRepository.find({
      where: { [field]: Like(`%${value}%`) },
    });
  }
}
