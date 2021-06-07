import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.user.create({
  //   data: {
  //     Name: "Alice",
  //     Email: "alice@prisma.io",
  //     Posts: {
  //       create: { Title: "Hello World" },
  //     },
  //     Profile: {
  //       create: { Bio: "I like turtles" },
  //     },
  //   },
  // });

  const allUsers = await prisma.user.findMany({
    include: {
      Posts: true,
      Profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
