import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { DeepPartial, Repository } from 'typeorm';
import { createLeadRequestDto, LeadListDto } from './lead.dto';
import { Project } from 'src/project/project.entity';
import { User } from 'src/user/user.entity';
type SourceWiseRaw = {
  source: string;
  count: string; // because COUNT(*) returns string in Postgres
};
type OwnerWiseRaw = {
  ownerId: number | null;
  ownerName: string | null;
  count: string; // ⚠️ comes as string from PostgreSQL
};
type StatusWiseRaw = {
  status: string;
  count: string;
};
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
      page = 1,
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
    query.skip((page - 1) * limit).take(limit);

    // 🔽 Sorting
    query.orderBy('lead.id', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  countLeads(startDate?: string, endDate?: string) {
    const query = this.leadRepository.createQueryBuilder('lead');

    if (startDate && endDate) {
      query.andWhere('lead.createdAt BETWEEN :start AND :end', {
        start: new Date(startDate),
        end: new Date(endDate),
      });
    }

    return query.getCount(); //
  }
  async countTodayLeads(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.leadRepository
      .createQueryBuilder('lead')
      .where('lead.createdAt >= :today', { today })
      .getCount();
  }

  async getSourceWise(
    startDate?: string,
    endDate?: string,
  ): Promise<{ source: string; count: number }[]> {
    const query = this.leadRepository.createQueryBuilder('lead');

    if (startDate && endDate) {
      query.andWhere('lead.createdAt BETWEEN :start AND :end', {
        start: new Date(startDate),
        end: new Date(endDate),
      });
    }

    const result = await query
      .select('lead.source', 'source')
      .addSelect('COUNT(*)', 'count')
      .groupBy('lead.source')
      .getRawMany<SourceWiseRaw>(); // ✅ typed

    return result.map((item) => ({
      source: item.source,
      count: Number(item.count),
    }));
  }

  async getOwnerWise(
    startDate?: string,
    endDate?: string,
  ): Promise<
    { ownerId: number | null; ownerName: string | null; count: number }[]
  > {
    const query = this.leadRepository
      .createQueryBuilder('lead')
      .leftJoin('lead.owner', 'owner');

    if (startDate && endDate) {
      query.andWhere('lead.createdAt BETWEEN :start AND :end', {
        start: new Date(startDate),
        end: new Date(endDate),
      });
    }

    const result = await query
      .select('owner.id', 'ownerId')
      .addSelect('owner.name', 'ownerName')
      .addSelect('COUNT(lead.id)', 'count')
      .groupBy('owner.id')
      .addGroupBy('owner.name')
      .getRawMany<OwnerWiseRaw>(); // ✅ typed

    return result.map((item) => ({
      ownerId: item.ownerId ? Number(item.ownerId) : null,
      ownerName: item.ownerName,
      count: Number(item.count),
    }));
  }

  async getStatusWise(startDate?: string, endDate?: string) {
    const query = this.leadRepository.createQueryBuilder('lead');
    if (startDate && endDate) {
      query.andWhere('lead.createdAt BETWEEN :start AND :end', {
        start: new Date(startDate),
        end: new Date(endDate),
      });
    }

    const result = await query
      .select('lead.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('lead.status')
      .getRawMany<StatusWiseRaw>();

    return result.map((item) => ({
      status: item.status,
      count: Number(item.count),
    }));
  }
}
