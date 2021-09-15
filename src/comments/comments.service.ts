import {Injectable} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UpdateCommentDto} from './dto/update-comment.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CommentEntity} from './entities/comment.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentEntity)
        private postsService: Repository<CommentEntity>,
    ) {}

    create(dto: CreateCommentDto) {
        return this.postsService.save({
            text: dto.text,
            post: {id: dto.postId},
            user: {id: 1},
        });
    }

    findAll() {
        return this.postsService.find();
    }

    findOne(id: number) {
        return this.postsService.findOne(id);
    }

    update(id: number, dto: UpdateCommentDto) {
        return this.postsService.update(id, dto);
    }

    remove(id: number) {
        return this.postsService.delete(id);
    }
}
