import {IsEmail, IsString} from 'class-validator';

export class LoginUserDto {
    @IsEmail(undefined, {message: 'Неверная почта'})
    email: string;

    @IsString()
    password?: string;
}
