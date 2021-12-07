import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-vkontakte';
import {Injectable} from '@nestjs/common';
import {UsersService} from '../../users/users.service';

@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, 'vkontakte') {
    constructor(private usersService: UsersService) {
        super({
            clientID: '8017855',
            clientSecret: 'vgYCojWRPtrQ686D3O8V',
            callbackURL: 'http://localhost:5000/auth/vkontakte/callback',
        });
    }
    async validate(accessToken, refreshToken, params, profile, done): Promise<any> {
        return done(null, profile);
    }
}
