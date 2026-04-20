import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LeadService } from './lead.service';
import { createLeadRequestDto, LeadListDto } from './lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() dto: createLeadRequestDto) {
    return this.leadService.createLead(dto);
  }

  @Get()
  findAll(@Query() dto: LeadListDto) {
    return this.leadService.getLeadList(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.getLeadDetails(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<createLeadRequestDto>) {
    return this.leadService.updateLead(+id, dto);
  }
}
