import { Controller, Get, Query } from '@nestjs/common';
import { DashboardFilterDto } from './dashboard.dto';
import { DashboardService } from './dashboard.service';
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  getDashboard(@Query() dto: DashboardFilterDto) {
    return this.dashboardService.getDashboard(dto);
  }
}
