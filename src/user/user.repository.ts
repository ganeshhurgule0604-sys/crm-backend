import { ILike, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequestDto, userListDto } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(dto: CreateUserRequestDto) {
    const user = this.userRepository.create(dto);

    return this.userRepository.save(user);
  }
  update(id, dto: Partial<CreateUserRequestDto>) {
    return this.userRepository.update(id, dto);
  }

  userDetails(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findUserByParam(value: string, param: string) {
    return this.userRepository.findOne({
      where: {
        [param]: ILike(`%${value}%`),
      },
    });
  }

  userList(dto: userListDto) {
    const { name, email, phone, role, limit = 10, page = 1 } = dto;

    const query = this.userRepository.createQueryBuilder('user');

    if (name) {
      query.andWhere('user.name ILIKE :name', {
        name: `%${name}%`,
      });
    }
    if (email) {
      query.andWhere('user.email ILKIE :email', { email: `%${email}%` });
    }
    if (phone) {
      query.andWhere('user.phone ILKE :phone', {
        phone: `%${phone}%`,
      });
    }
    if (role) {
      query.andWhere({
        role: role,
      });
    }

    query.take(limit).skip((page - 1) * limit);

    return query.getManyAndCount();
  }
}
