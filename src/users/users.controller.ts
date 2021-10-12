import {Controller, Get, Body, Patch, Param, UseGuards, Request, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import {UpdateUserDto} from './dto/update-user.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {SearchUserDto} from './dto/search-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMyProfile(@Request() req) {
        return this.userService.findMyProfile(+req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+req.user.id, updateUserDto);
    }

    @Get('search')
    search(@Query() dto: SearchUserDto) {
        return this.userService.findSearch(dto);
    }

    @Get(':id')
    getProfile(@Param('id') id: string) {
        return this.userService.findById(+id);
    }
}
