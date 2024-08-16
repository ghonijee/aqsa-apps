import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PasswordCompare } from "../lib/utils/password.helper";
import { authRepository } from "@/repositories/core/auth-repository";
import getListCompaniesByUserIdAction from "@/actions/company/get-list-companies-by-user-id.action";
import { NextRequest, NextResponse } from "next/server";

const credentialsProvider = CredentialsProvider({
  name: "credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials, request) => {
    const { username, password } = credentials as {
      username: string;
      password: string;
    };

    const user = await authRepository.findByUsername(username);

    if (!user) {
      return null;
    }

    if (!PasswordCompare(password, user.password)) {
      return null;
    }

    const companies = await getListCompaniesByUserIdAction(
      user.id?.toString()!
    );

    if (companies.length === 0) {
      return null;
    }

    return {
      ...user,
      id: user.id?.toString(),
      companies: companies,
    };
  },
});

const publicUrl = ["/sign-in", "/sign-up"];

export const nextAuthConfig = {
  trustHost: true,
  providers: [credentialsProvider],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl, headers } }) {
      if (!auth) {
        return false;
      }

      const [_, companyCode, moduleName, featureName] =
        nextUrl.pathname.split("/");
      const requestHeaders = new Headers(headers);
      requestHeaders.set("X-Full-Path", nextUrl.pathname);
      requestHeaders.set("X-Company-Code", companyCode);
      requestHeaders.set("X-Module-Name", moduleName);
      requestHeaders.set("X-Feature-Name", featureName);

      const companies = auth.user.companies;

      const isUrlWithoutCompany = nextUrl.pathname === "/";
      const isSignInPage = nextUrl.pathname === "/sign-in";
      const isAuthorizedPage =
        publicUrl.some((url) => nextUrl.pathname.startsWith(url)) === false;

      if (!auth && isAuthorizedPage) {
        return NextResponse.redirect(new URL("/sign-in", nextUrl.origin));
      }

      if ((auth && isSignInPage) || (isUrlWithoutCompany && auth)) {
        return NextResponse.redirect(
          new URL(`/${companies[0].code}`, nextUrl.origin)
        );
      }

      return NextResponse.next({
        headers: requestHeaders,
      });
    },
    async signIn({ user }) {
      if (!user) {
        return false;
      }

      const companies = await getListCompaniesByUserIdAction(user.id!);

      if (companies.length === 0) {
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
