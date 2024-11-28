import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import {oneTap} from "better-auth/plugins";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL as string);

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
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    }
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secondaryStorage: {
    get: async (key) => {
      try {
        const value = await redis.get(key);
        return value ? JSON.parse(value) : null; // Parse JSON if value exists
      } catch (error) {
        console.error(`Error getting key "${key}" from Redis:`, error);
        throw error;
      }
    },
    set: async (key, value) => {
      try {
          await redis.set(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting key "${key}" in Redis:`, error);
        throw error;
      }
    },
    delete: async (key) => {
      try {
        await redis.del(key);
      } catch (error) {
        console.error(`Error deleting key "${key}" from Redis:`, error);
        throw error;
      }
    },
  },
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
