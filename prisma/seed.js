import { faker } from "@faker-js/faker"; // ESM 구문을 그대로 사용
import db from "../db";

async function main() {
  for (let i = 0; i < 10; i++) {
    await db.user.create({
      data: {
        username: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
      },
    });
    await db.guide.create({
      data: {
        fullname: faker.person.fullName(),
        birthdate: "1990-04-25",
        height: "175",
        address: faker.location.city(),
        phone: faker.phone.number(),
        resumePhoto: faker.image.avatar(),
        selfIntro: "자기소개",
        user: {
          connect: {
            id: i + 1,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
