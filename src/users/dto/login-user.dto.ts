import {IsEmail, IsString, MinLength} from 'class-validator';

export class LoginUserDto {
    @IsEmail(undefined, {message: 'Неверная почта'})
    email: string;

    @IsString()
    @MinLength(6, {message: 'Пароль не менее 6 символов'})
    password?: string;
}
