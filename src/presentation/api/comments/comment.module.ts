import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentModule } from "../../../domain/comment/comment.module";

@Module({
    controllers: [CommentController],
    imports: [CommentModule],
})
export class CommentApiModule {}
