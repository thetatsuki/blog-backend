import {Controller, Request, Post, UseGuards, Body} from '@nestjs/common';

import {AuthService} from './auth.service';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {CreateUserDto} from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginJWT(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        console.log(dto);
        return this.authService.register(dto);
    }
}
