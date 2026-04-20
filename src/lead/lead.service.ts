import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadRepository } from './lead.repository';
import { createLeadRequestDto, LeadListDto, leadDto } from './lead.dto';
import { ResponseDto, commonCreateUpdateResponseDto } from 'src/common/dto';

@Injectable()
export class LeadService {
  constructor(private readonly leadRepository: LeadRepository) {}

  async createLead(
    dto: createLeadRequestDto,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    const result = await this.leadRepository.create(dto);
    return {
      data: { id: result.id, message: 'Lead Created Successfully' },
      metaData: {},
    };
  }

  async updateLead(
    id: number,
    dto: Partial<createLeadRequestDto>,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    const lead = await this.leadRepository.getDetails(id);
    if (!lead) {
      throw new NotFoundException('Lead Not Found');
    }
    await this.leadRepository.update(id, dto);
    return {
      data: { id: id, message: 'Lead Updated Successfully' },
      metaData: {},
    };
  }

  async getLeadDetails(id: number): Promise<ResponseDto<leadDto>> {
    const result = await this.leadRepository.getDetails(id);
    if (!result) {
      throw new NotFoundException('Lead Not Found');
    }
    return {
      data: result as leadDto,
      metaData: {},
    };
  }

  async getLeadList(dto: LeadListDto) {
    const { data, total, offset, limit } =
      await this.leadRepository.getList(dto);
    return {
      data: data,
      metaData: {
        total,
        page: offset,
        limit,
      },
    };
  }
}
