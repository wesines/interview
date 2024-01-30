import { ForbiddenException } from "@nestjs/common";
import { Comment } from "./comment.entity";

const canUserMutateComment = (comment: Comment, connectedUser: number) => {
    return comment.idUserComment === connectedUser;
};

export const validateUserCanMutateComment = (
    comment: Comment,
    connectedUser: number,
) => {
    if (!canUserMutateComment(comment, connectedUser)) {
        throw new ForbiddenException("User cannot mutate comment");
    }
};
