import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PostEntity} from './entities/post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postsService: Repository<PostEntity>,
    ) {}

    create(dto: CreatePostDto) {
        return this.postsService.save(dto);
    }

    findAll() {
        return this.postsService.find();
    }

    async findOne(id: number) {
        const post = await this.postsService.findOne(+id);

        console.log(post);

        if (!post) {
            throw new NotFoundException('Статья не найдена');
        }

        return post;
    }

    async update(id: number, dto: UpdatePostDto) {
        const post = await this.postsService.findOne(+id);

        if (!post) {
            throw new NotFoundException('Статья не найдена');
        }

        return this.postsService.update(+id, dto);
    }

    async remove(id: number) {
        const post = await this.postsService.findOne(+id);

        if (!post) {
            throw new NotFoundException('Статья не найдена');
        }

        return this.postsService.delete(id);
    }
}
