import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        email: "mmv147.valois@gmail.com",
        name: "Marcelo Valois",
      },
    });

    console.log(user);
  } catch (error) {
    console.error(error);
  }
}

main().then(async () => {
  await prisma.$disconnect();
});
