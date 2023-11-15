import type { PrismaClient } from "@prisma/client";

export const sharedReadIsUsernameTaken = async (username: string, prisma: PrismaClient) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return Boolean(user);
};
