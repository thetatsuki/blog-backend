import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity';
import {Repository} from 'typeorm';
import {LoginUserDto} from './dto/login-user.dto';

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

    findAll() {
        return this.userService.find();
    }

    findById(id: number) {
        return this.userService.findOne(id);
    }

    findByCond(cond: LoginUserDto) {
        return this.userService.findOne(cond);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
