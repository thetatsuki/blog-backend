import {ForbiddenException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import {UserEntity} from '../users/entities/user.entity';
import {CreateUserDto} from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByCond({
            email,
            password,
        });
        if (user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    generateJwtToken(data: {id: number; email: string}) {
        const payload = {email: data.email, sub: data.id};
        return this.jwtService.sign(payload);
    }

    async login(user: UserEntity) {
        const {password, ...userData} = user;
        return {
            ...userData,
            access_token: this.generateJwtToken(userData),
        };
    }

    async register(dto: CreateUserDto) {
        try {
            const {password, ...userData} = await this.usersService.create(dto);
            return {
                ...userData,
                access_token: this.generateJwtToken(userData),
            };
        } catch (e) {
            throw new ForbiddenException(e);
        }
    }
}
