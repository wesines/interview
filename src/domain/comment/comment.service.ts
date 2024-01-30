import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { MutableComment } from "./comment.entity";
import { validateUserCanMutateComment } from "./rules";

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    create = async (
        comment: MutableComment,
        authorId: number,
        articleId: number,
        idUserComment: number,
    ) => {
        // verify if articleId or authorId are not null/undefined
        if (
            articleId === null ||
            articleId === undefined ||
            authorId === null ||
            authorId === undefined
        ) {
            throw new NotFoundException(
                `articleId or authorId are null/undefined`,
            );
        }
        // verify if article and user exist
        const article = await this.prisma.article.findUnique({
            where: { id: articleId },
        });
        if (!article) {
            throw new NotFoundException(
                `Article's id : ${articleId} not found`,
            );
        }
        const user = await this.prisma.user.findUnique({
            where: { id: authorId },
        });
        if (!user) {
            throw new NotFoundException(`User's id: ${authorId} not found`);
        }

        const newComment = this.prisma.comment.create({
            data: { ...comment, authorId, articleId, idUserComment },
        });
        console.log(`New comment from ${idUserComment}`);
        return newComment;
    };

    findAll = async () => {
        return await this.prisma.comment.findMany();
    };

    findByArticle = async (articleId: number) => {
        // verify if the article exists
        const article = await this.prisma.article.findUnique({
            where: { id: articleId },
        });
        if (!article) {
            throw new NotFoundException(`Article's id: ${articleId} not found`);
        }
        return this.prisma.comment.findMany({
            where: { articleId },
        });
    };

    findOne = async (id: number) => {
        // verify if the comment exists
        const comment = await this.prisma.comment.findUnique({
            where: { id: id },
        });

        if (!comment) {
            throw new NotFoundException(`Comment's id: ${id} not found`);
        } else {
            return comment;
        }
    };

    update = async (
        id: number,
        comment: Partial<MutableComment>,
        userConnected: number,
    ) => {
        const persistedComment = await this.prisma.comment.findUnique({
            where: { id },
        });
        if (!persistedComment) {
            throw new NotFoundException(`Comment's id: ${id} not found`);
        }
        validateUserCanMutateComment(persistedComment, userConnected);

        return this.prisma.comment.update({
            where: { id },
            data: comment,
        });
    };

    remove = async (id: number, userConnected: number) => {
        // verify if articleId or authorId are not null/undefined
        if (
            id === null ||
            id === undefined ||
            userConnected === null ||
            userConnected === undefined
        ) {
            throw new NotFoundException(
                `Id or userConnected are null/undefined`,
            );
        }
        const comment = await this.prisma.comment.findUnique({
            where: { id },
        });
        if (!comment) {
            throw new NotFoundException(`Comment's id: ${id} not found`);
        }
        validateUserCanMutateComment(comment, userConnected);

        return this.prisma.comment.delete({
            where: { id },
        });
    };
}
