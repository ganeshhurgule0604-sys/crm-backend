import { PaginationDto } from 'src/common/dto';
import {
  BudgetRangeEnum,
  configurationEnum,
  LeadSourceEnum,
  LeadStatus,
} from './lead.enum';

export class leadDto {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  project?: { id: number; name: string };
  configuration?: configurationEnum;
  budget?: BudgetRangeEnum;
  status?: LeadStatus;
  source?: LeadSourceEnum;
  owner?: { id: number; name: string };
}

export class createLeadRequestDto {
  name?: string;
  email?: string;
  phone?: string;
  project?: number;
  configuration?: configurationEnum;
  budget?: BudgetRangeEnum;
  status?: LeadStatus;
  source?: LeadSourceEnum;
  owner?: number;
}

export class LeadListDto extends PaginationDto {
  name?: string;
  email?: string;
  phone?: string;

  status?: LeadStatus;
  source?: LeadSourceEnum;
  configuration?: configurationEnum;
  budget?: BudgetRangeEnum;

  projectId?: number;
  ownerId?: number;
}
