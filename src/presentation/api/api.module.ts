import { Module } from "@nestjs/common";
import { ArticlesApiModule } from "./articles/articles.module";
import { AuthApiModule } from "./auth/auth.module";
import { CommentApiModule } from "./comments/comment.module";

@Module({
    imports: [ArticlesApiModule, AuthApiModule, CommentApiModule],
})
export class ApiModule {}
