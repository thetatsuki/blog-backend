import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UsersService} from '../../users/users.service';
import {jwtConstants} from '../constants/jwtConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: {sub: number; email: string}) {
        const data = {id: payload.sub, email: payload.email};

        const user = await this.userService.findByCond(data);

        if (!user) {
            throw new UnauthorizedException('Аккаунт не был найден');
        }
        return data;
    }
}
