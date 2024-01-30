import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const firstUser = await prisma.user.upsert({
        where: { email: "toto@school.com" },
        update: {},
        create: {
            email: "toto@school.com",
            password: "head0",
        },
    });
    const secondUser = await prisma.user.upsert({
        where: { email: "user2@school.com" },
        update: {},
        create: {
            email: "user2@school.com",
            password: "user2",
        },
    });
    const firstPost = await prisma.article.upsert({
        where: { title: "Is this a good article ?" },
        update: {},
        create: {
            title: "Is this a good article ?",
            authorId: firstUser.id,
            body: "Answer in the comments",
            description: "We wonder what makes a good article",
            published: false,
        },
    });

    const secondPost = await prisma.article.upsert({
        where: { title: "Is this a good repository ?" },
        update: {},
        create: {
            title: "Is this a good repository ?",
            authorId: firstUser.id,
            body: "Our engineers have been working hard, issuing new releases with many improvements...",
            description: "Assessing what makes a good repo",
            published: true,
        },
    });
    const thirdPost = await prisma.article.upsert({
        where: { title: "What do you think ?" },
        update: {},
        create: {
            title: "What do you think ?",
            authorId: secondUser.id,
            body: "Our engineers have been working hard, issuing new releases with many improvements...",
            description: "Assessing what makes a good repo",
            published: true,
        },
    });
    const commentOne = await prisma.comment.upsert({
        where: { id: 1 },
        update: {},
        create: {
            content: "that's right ?",
            articleId: secondPost.id,
            authorId: secondUser.id,
            idUserComment: firstUser.id,
        },
    });
    const commentTwo = await prisma.comment.upsert({
        where: { id: 2 },
        update: {},
        create: {
            content: "I like it ",
            articleId: secondPost.id,
            authorId: secondUser.id,
            idUserComment: firstUser.id,
        },
    });
    const commentThree = await prisma.comment.upsert({
        where: { id: 3 },
        update: {},
        create: {
            content: "I like this idea ",
            articleId: thirdPost.id,
            authorId: firstUser.id,
            idUserComment: secondUser.id,
        },
    });
    console.log({
        firstUser,
        secondUser,
        firstPost,
        secondPost,
        thirdPost,
        commentOne,
        commentTwo,
        commentThree,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
