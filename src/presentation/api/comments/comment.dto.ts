import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
    Comment,
    MutableComment,
} from "../../../domain/comment/comment.entity";
import { RequestDto, ResponseDto } from "../dto";

export class CommentDto implements Comment {
    @ApiProperty()
    id: number;

    @ApiProperty()
    authorId: number;

    @ApiProperty()
    idUserComment: number;

    @ApiProperty()
    articleId: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

export class CommentResponse implements ResponseDto<Comment, CommentDto> {
    data: Comment;
    constructor(data: Comment) {
        this.data = data;
    }
    fromEntity = (): CommentDto => {
        return {
            id: this.data.id,
            authorId: this.data.authorId,
            articleId: this.data.articleId,
            idUserComment: this.data.idUserComment,
            content: this.data.content,
            createdAt: this.data.createdAt,
            updatedAt: this.data.updatedAt,
        };
    };
}

export class CreateCommentDto implements MutableComment {
    @ApiProperty()
    content: string;
}

export class CreateCommentRequest
    implements RequestDto<MutableComment, CreateCommentDto>
{
    data: CreateCommentDto;
    constructor(data: CreateCommentDto) {
        this.data = data;
    }
    toEntity = (): MutableComment => {
        return {
            content: this.data.content,
        };
    };
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

export class UpdateCommentRequest
    implements RequestDto<Partial<MutableComment>, UpdateCommentDto>
{
    data: UpdateCommentDto;
    constructor(data: UpdateCommentDto) {
        this.data = data;
    }
    toEntity = (): Partial<MutableComment> => {
        return {
            content: this.data.content,
        };
    };
}
