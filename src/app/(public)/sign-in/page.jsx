import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <div className="bg-lower flex justify-center items-center min-h-screen">
      <div className="bg-base shadow-md rounded-md px-6 py-6 w-1/4">
        <div className="py-2 text-center">
          <h1 className="text-3xl font-bold text-color-base">Sign in</h1>
        </div>
        <div className="py-5 flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-color-base text-sm">
              Email
            </label>
            <Input id="email" type="email" placeholder="yourmail@mail.com" />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password" className="text-color-base text-sm">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Your secure password"
            />
          </div>
          <div className="mt-4">
            <Button
              variant="default"
              size="default"
              className="bg-primary-500 w-full"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
