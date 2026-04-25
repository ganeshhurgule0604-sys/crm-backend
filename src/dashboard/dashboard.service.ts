import { Injectable } from '@nestjs/common';
import { LeadService } from 'src/lead/lead.service';
import { DashboardFilterDto } from './dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly leadService: LeadService) {}

  async getDashboard(dto: DashboardFilterDto) {
    const { startDate, endDate } = dto;

    // 🚀 Call LeadService (NOT repository)
    const [totalLeads, todaysLeads, statusWise, sourceWise, ownerWise] =
      await Promise.all([
        this.leadService.countLeads(startDate, endDate),
        this.leadService.countTodayLeads(),
        this.leadService.getStatusWise(startDate, endDate),
        this.leadService.getSourceWise(startDate, endDate),
        this.leadService.getOwnerWise(startDate, endDate),
      ]);

    return {
      data: {
        leads: {
          total: totalLeads,
          today: todaysLeads,
          statusWise,
          sourceWise,
          ownerWise,
        },
      },
      metaData: {},
    };
  }
}
