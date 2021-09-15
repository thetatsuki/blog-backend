import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import {UserEntity} from '../../users/entities/user.entity';
import {PostEntity} from '../../posts/entities/post.entity';

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => UserEntity, {
        nullable: false,
    })
    @JoinColumn({name: 'userId'})
    user: UserEntity;

    @ManyToOne(() => PostEntity, {
        nullable: false,
    })
    @JoinColumn({name: 'postId'})
    post: PostEntity;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}
