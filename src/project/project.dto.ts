import { PaginationDto } from 'src/common/dto';
import { projectStatus } from './projet.enum';

export class projectDto {
  id?: number;

  name?: string;

  status?: projectStatus;

  location?: string;
}

export class CreateProjectDto {
  name?: string;

  status?: projectStatus;

  location?: string;
}

export class projectListDto extends PaginationDto {
  name?: string;

  status?: projectStatus;

  location?: string;
}
