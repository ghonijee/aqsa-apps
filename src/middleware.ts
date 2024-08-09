import NextAuth from "next-auth";
import { nextAuthConfig } from "./config/auth.config";

export const { auth: middleware } = NextAuth(nextAuthConfig);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*$|_next).*)"],
};
