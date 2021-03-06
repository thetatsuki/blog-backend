import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PostEntity} from './entities/post.entity';
import {SearchPostDto} from './dto/search-post.dto';

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
        const posts = this.postsService.find({
            order: {
                createdAt: 'DESC',
            },
        });

        return posts;
    }

    async findPopular() {
        const qb = this.postsService.createQueryBuilder();

        qb.orderBy('views', 'DESC');
        qb.limit(10);

        const [items, total] = await qb.getManyAndCount();

        return {
            items,
            total,
        };
    }

    async findSearch(dto: SearchPostDto) {
        const qb = this.postsService.createQueryBuilder('p');

        qb.limit(dto.limit || 0);
        qb.take(dto.take || 10);

        if (dto.views) {
            qb.orderBy('views', dto.views);
        }

        if (dto.body) {
            qb.andWhere(`p.body ILIKE :body`);
        }

        if (dto.title) {
            qb.andWhere(`p.title ILIKE :title`);
        }

        if (dto.tag) {
            qb.andWhere(`p.tags ILIKE :tag`);
        }

        qb.setParameters({
            title: `%${dto.title}%`,
            tag: `%${dto.tag}%`,
            body: `%${dto.body}%`,
        });

        const [items, total] = await qb.getManyAndCount();

        return {
            items,
            total,
        };
    }

    async findOne(id: number) {
        const qb = await this.postsService.createQueryBuilder('posts');

        await qb
            .whereInIds(id)
            .update()
            .set({
                views: () => `views + 1`,
            })
            .execute();

        return this.postsService.findOne(id);
    }

    async update(id: number, dto: UpdatePostDto) {
        const post = await this.postsService.findOne(+id);

        if (!post) {
            throw new NotFoundException('???????????? ???? ??????????????');
        }

        return this.postsService.update(+id, dto);
    }

    async remove(id: number) {
        const post = await this.postsService.findOne(+id);

        if (!post) {
            throw new NotFoundException('???????????? ???? ??????????????');
        }

        return this.postsService.delete(id);
    }
}
