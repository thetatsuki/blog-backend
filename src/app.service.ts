import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    getUsers(id: number): string {
        return `hello ${id}`;
    }

    getAllUsers(): object {
        return [
            {
                id: 1,
                name: 'alex',
            },
            {
                id: 2,
                name: 'kapochak',
            },
        ];
    }
}
