import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity';
import {Repository} from 'typeorm';
import {LoginUserDto} from './dto/login-user.dto';
import {SearchUserDto} from './dto/search-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userService: Repository<UserEntity>,
    ) {}

    create(dto: CreateUserDto) {
        const user = this.userService.save(dto);
        return user;
    }

    async findSearch(dto: SearchUserDto) {
        const qb = this.userService.createQueryBuilder('u');

        qb.limit(dto.limit || 0);
        qb.take(dto.take || 10);

        if (dto.email) {
            qb.andWhere(`u.email ILIKE :email`);
        }
        if (dto.fullName) {
            qb.andWhere(`u.fullName ILIKE :fullName`);
        }

        qb.setParameters({
            email: `%${dto.email}%`,
            fullName: `%${dto.fullName}%`,
        });

        const [items, count] = await qb.getManyAndCount();

        return {items, count};
    }

    async findById(id: number) {
        const {password, ...user} = await this.userService.findOne(id);
        return user;
    }

    findMyProfile(id: number) {
        return this.userService.findOne(id);
    }

    findByCond(cond: LoginUserDto) {
        return this.userService.findOne(cond);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.userService.update(id, updateUserDto);
    }
}
