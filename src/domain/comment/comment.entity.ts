import { Mutable } from "../../utils/types";

export type Comment = {
    id: number;
    authorId: number;
    idUserComment: number;
    content: string;
    articleId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type MutableComment = Mutable<
    Omit<Comment, "authorId" | "articleId" | "idUserComment">
>;
