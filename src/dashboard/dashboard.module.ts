import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { LeadModule } from 'src/lead/lead.module';

@Module({
  imports: [LeadModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
