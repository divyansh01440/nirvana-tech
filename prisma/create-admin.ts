import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("MyStudio!Lives@2026",12);

  const admin = await prisma.user.upsert({
    where: { email: "nirvanatech07@gmail.com" },
    update: {
      password,
      role: "ADMIN",
    },
    create: {
      email: "nirvanatech07@gmail.com",
      name: "Divyansh Gautam",
      password,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin created/updated:", admin.email);
}

main().finally(() => prisma.$disconnect());