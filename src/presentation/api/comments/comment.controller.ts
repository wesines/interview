import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from "@nestjs/swagger";
import {
    CommentDto,
    CommentResponse,
    CreateCommentDto,
    CreateCommentRequest,
    UpdateCommentDto,
    UpdateCommentRequest,
} from "./comment.dto";
import { JwtAuthGuard } from "../auth/auth.guard";
import { CommentService } from "../../../domain/comment/comment.service";

@Controller("comments")
@ApiTags("Comments")
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post("/:authorId/:articleId")
    @ApiCreatedResponse({ type: CommentDto })
    create(
        @Body() createCommentDto: CreateCommentDto,
        @Param("authorId") authorId: number,
        @Param("articleId") articleId: number,
        @Request() request,
    ) {
        const comment = new CreateCommentRequest(createCommentDto).toEntity();
        return this.commentService.create(
            comment,
            +authorId,
            +articleId,
            request.user.id,
        );
    }

    @Get()
    @ApiOkResponse({ type: CommentDto, isArray: true })
    async findAll() {
        const comment = await this.commentService.findAll();
        return comment.map((comment) =>
            new CommentResponse(comment).fromEntity(),
        );
    }
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("/byArticle/:articleId")
    @ApiOkResponse({ type: CommentDto, isArray: true })
    findByArticle(@Param("articleId") articleId: string) {
        return this.commentService.findByArticle(+articleId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("/:id")
    @ApiOkResponse({ type: CommentDto })
    async findOne(@Param("id") id: string) {
        const comment = await this.commentService.findOne(+id);
        return new CommentResponse(comment).fromEntity();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch("/:id")
    update(
        @Param("id") id: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @Request() request,
    ) {
        const comment = new UpdateCommentRequest(updateCommentDto).toEntity();
        return this.commentService.update(+id, comment, request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete("/:id")
    async remove(@Param("id") id: string, @Request() request) {
        const deletedArticle = await this.commentService.remove(
            +id,
            request.user.id,
        );
        return new CommentResponse(deletedArticle).fromEntity();
    }
}
