import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { DeepPartial, Repository } from 'typeorm';
import { createLeadRequestDto, LeadListDto } from './lead.dto';
import { Project } from 'src/project/project.entity';
import { User } from 'src/user/user.entity';

export class LeadRepository {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
  ) {}
  create(dto: createLeadRequestDto) {
    const { project, owner, ...rest } = dto;

    const lead: DeepPartial<Lead> = {
      ...rest,
      project: project ? ({ id: project } as Project) : undefined,
      owner: owner ? ({ id: owner } as User) : undefined,
    };

    const entity = this.leadRepository.create(lead);

    return this.leadRepository.save(entity);
  }
  update(id: number, dto: Partial<createLeadRequestDto>) {
    const { project, owner, ...rest } = dto;

    return this.leadRepository.update(id, {
      ...rest,
      project: project ? ({ id: project } as Project) : undefined,
      owner: owner ? ({ id: owner } as User) : undefined,
    });
  }

  getDetails(id: number) {
    return this.leadRepository.findOne({
      relations: ['project', 'owner'],
      where: { id: id },
    });
  }

  async getList(dto: LeadListDto) {
    const {
      name,
      email,
      phone,
      status,
      source,
      configuration,
      budget,
      projectId,
      ownerId,
      offset = 1,
      limit = 10,
    } = dto;

    const query = this.leadRepository
      .createQueryBuilder('lead')
      .leftJoinAndSelect('lead.project', 'project')
      .leftJoinAndSelect('lead.owner', 'owner');

    // 🔍 Filters
    if (name) {
      query.andWhere('lead.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (email) {
      query.andWhere('lead.email ILIKE :email', {
        email: `%${email}%`,
      });
    }

    if (phone) {
      query.andWhere('lead.phone ILIKE :phone', {
        phone: `%${phone}%`,
      });
    }

    if (status) {
      query.andWhere('lead.status = :status', { status });
    }

    if (source) {
      query.andWhere('lead.source = :source', { source });
    }

    if (configuration) {
      query.andWhere('lead.configuration = :configuration', {
        configuration,
      });
    }

    if (budget) {
      query.andWhere('lead.budget = :budget', { budget });
    }

    if (projectId) {
      query.andWhere('project.id = :projectId', { projectId });
    }

    if (ownerId) {
      query.andWhere('owner.id = :ownerId', { ownerId });
    }

    // 📄 Pagination
    query.skip((offset - 1) * limit).take(limit);

    // 🔽 Sorting
    query.orderBy('lead.id', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      offset,
      limit,
    };
  }
}
