import {IsString, IsEmail, MinLength} from 'class-validator';
import {UniqueColumn} from '../../auth/validations/unique-column';
import {UserEntity} from '../entities/user.entity';

export class CreateUserDto {
    @MinLength(3, {message: 'Имя не менее 3 символов'})
    @IsString()
    fullName: string;

    @IsEmail(undefined, {message: 'Неверная почта'})
    @UniqueColumn(UserEntity)
    email: string;

    @IsString()
    @MinLength(6, {message: 'Пароль не менее 6 символов'})
    password?: string;
}
