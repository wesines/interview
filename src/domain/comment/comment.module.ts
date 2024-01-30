import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";

@Module({
    providers: [CommentService],
    imports: [PrismaModule],
    exports: [CommentService],
})
export class CommentModule {}
