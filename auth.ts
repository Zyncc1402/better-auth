import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import {oneTap} from "better-auth/plugins";
// import { createClient } from "redis";

// const redis = createClient({
//   url: process.env.REDIS_URL as string,
// });

export const auth = betterAuth({
  plugins: [nextCookies(), oneTap()],
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24, // 1 day
    updateAge: 60 * 60, // 1 hour
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // secondaryStorage: {
  //   get: async (key) => await redis.get(key),
  //   set: async (key, value, ttl) => {
  //     if (ttl) await redis.set(key, JSON.stringify(value), { EX: ttl });
  //     else await redis.set(key, JSON.stringify(value));
  //   },
  //   delete: async () => await redis.del("gwagw"),
  // },
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
