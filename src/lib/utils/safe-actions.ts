import { auth } from "@/auth";
import { companyRepository } from "@/repositories/core/company-rpository";
import { url } from "inspector";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { headers } from "next/headers";

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next }) => {
  const header = headers();
  const url = header.get("Referer");
  const origin = header.get("Origin");
  const pathName = url?.replace(origin ?? "", "");

  const [_, companyCode] = pathName?.split("/") ?? [];

  return next({ ctx: { companyCode } });
});

// Auth client defined by extending the base one.
// Note that the same initialization options and middleware functions of the base client
// will also be used for this one.
export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next, ctx: { companyCode } }) => {
    const session = await auth();

    if (!session) {
      throw new Error("Session not found!");
    }

    if (!companyCode) {
      throw new Error("Company Code not found!");
    }

    const company = await companyRepository.findByCompanyCode(companyCode);

    if (!company) {
      throw new Error("Company not found!");
    }

    // Return the next middleware with `userId` value in the context
    return next({ ctx: { userId: session?.user.id, company } });
  });
