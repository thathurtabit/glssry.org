import { PrismaAdapter as prismaAdapter } from "@next-auth/prisma-adapter";
import type { UserRole } from "@prisma/client";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import facebookProvider from "next-auth/providers/facebook";
import githubProvider from "next-auth/providers/github";
import googleProvider from "next-auth/providers/google";
import redditProvider from "next-auth/providers/reddit";

import { environment } from "~/environment.mjs";

import { database } from "~/server/database";
import { EURLS } from "~/settings/constants";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
    };
    expires?: string;
  }

  interface User {
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      session: {
        ...session,
        user: {
          ...session.user,
          role: user.role as UserRole,
        },
      },
      user: {
        image: user.image,
        role: user.role as UserRole,
        id: user.id,
      },
    }),
  },
  adapter: prismaAdapter(database),
  pages: {
    signIn: EURLS.SignIn,
    verifyRequest: EURLS.SignInMagicLink,
    error: EURLS.SignInError, // Error code passed in query string as ?error=
  },
  providers: [
    // NOTE: Github only allows an app to have one callback URL, so there needs to be a Dev and Prod app
    githubProvider({
      clientId: environment.GITHUB_CLIENT_ID,
      clientSecret: environment.GITHUB_CLIENT_SECRET,
      // Checks: ["pkce", "state"], // Required here: https://github.com/nextauthjs/next-auth/issues/4190#issuecomment-1326519901
    }),
    googleProvider({
      clientId: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
    }),
    facebookProvider({
      clientId: environment.FACEBOOK_CLIENT_ID,
      clientSecret: environment.FACEBOOK_CLIENT_SECRET,
    }),
    redditProvider({
      clientId: environment.REDDIT_CLIENT_ID,
      clientSecret: environment.REDDIT_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (context: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => getServerSession(context.req, context.res, authOptions);
