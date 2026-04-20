import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { LeadRepository } from './lead.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  providers: [LeadService, LeadRepository],
  controllers: [LeadController],
  exports: [LeadService],
})
export class LeadModule {}
