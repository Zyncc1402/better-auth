import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, oneTap } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [nextCookies(), oneTap(), admin()],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    generateId: () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let uuid = "";
      for (let i = 0; i < 11; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        uuid += characters[randomIndex];
      }
      return uuid;
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 1, // 1 day
    updateAge: 60 * 60, // 1 hour
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
