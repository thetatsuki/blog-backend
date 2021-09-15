import {IsString, IsEmail, MinLength} from 'class-validator';

export class CreateUserDto {
    @MinLength(3, {message: 'Имя не менее 3 символов'})
    @IsString()
    fullName: string;

    @IsEmail(undefined, {message: 'Неверная почта'})
    email: string;

    @IsString()
    @MinLength(6, {message: 'Пароль не менее 6 символов'})
    password?: string;
}
