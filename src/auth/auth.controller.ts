import {Controller, Response, Request, Post, UseGuards, Body, Get} from '@nestjs/common';

import {AuthService} from './auth.service';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {VkontakteAuthGuard} from './guards/vkontakte-auth.guard';

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

    @UseGuards(VkontakteAuthGuard)
    @Get('vkontakte')
    async authVkontakte(@Request() req) {}

    @UseGuards(VkontakteAuthGuard)
    @Get('vkontakte/callback')
    vkontakteAuthRedirect(@Request() req, @Response() res) {
        return this.authService.authVkontakte(req, res);
    }
}
