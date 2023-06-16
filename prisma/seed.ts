import { parseArgs } from "node:util";
import { Prisma, PrismaClient, UserRole } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const {
    values: { environment },
  } = parseArgs({
    options: {
      environment: { type: "string" },
    },
  });

  switch (environment) {
    case "development":
      /** Data for your development */
      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.create({
            data: {
              nim: "13520065",
              passwordHash: await hash("password", 10),
              role: UserRole.ADMIN,
            },
          });
          console.log(user);
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted, // Serializable for unversioned transactions
        }
      );
      break;
    case "test":
      /** Data for your test environment */
      break;
    default:
      break;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
