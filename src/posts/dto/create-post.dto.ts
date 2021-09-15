import {} from 'class-validator';

export class CreatePostDto {
    title: string;

    body: string;

    tags: string;
}
