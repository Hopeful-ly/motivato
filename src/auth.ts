import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import Passkey from "next-auth/providers/passkey";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord, Google, Passkey],
  adapter: PrismaAdapter(prisma),
  experimental: { enableWebAuthn: true },
});
