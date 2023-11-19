import type { PrismaClient, User } from "@prisma/client";
import { errorMessage } from "~/server/api/utils/error-message";

export const sharedReadUserData = async (userId: string, prisma: PrismaClient): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch {
    throw new Error(errorMessage.readUserData(404, "user not found"));
  }
};
