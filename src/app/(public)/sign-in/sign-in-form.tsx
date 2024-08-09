"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";

const signInSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    await signIn("credentials", values, {
      redirect: true,
    });
  }

  return (
    <div className="bg-base shadow-md rounded-md px-6 py-6 w-1/4">
      <div className="py-2 text-center">
        <h1 className="text-3xl font-bold text-color-base">Sign in</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-5 flex flex-col gap-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-y-2">
                    <FormLabel>
                      <label
                        htmlFor="username"
                        className="text-color-base text-sm"
                      >
                        Username
                      </label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="password" className="text-color-base text-sm">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your secure password"
                    {...field}
                  />
                </div>
              )}
            />
            <div className="mt-4">
              <Button
                variant="default"
                size="default"
                className="bg-primary-500 w-full"
                type="submit"
              >
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
