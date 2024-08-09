import NextAuth from "next-auth";
import { UserSession } from "./entities";
import { nextAuthConfig } from "./config/auth.config";

declare module "next-auth" {
  interface Session {
    user: UserSession;
  }

  interface User {
    id?: string | undefined;
    name?: string | null | undefined;
    username: string;
    email?: string | null;
    image?: string | null | undefined;
    companies?: UserSession["companies"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthConfig);
