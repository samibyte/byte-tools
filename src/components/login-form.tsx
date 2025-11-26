"use client";

import React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { BottomGradient } from "./BottomGradient";
import { LabelInputContainer } from "./LabelInputContainer";

interface Inputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Successfully logged in!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);

    try {
      await signIn(provider, { callbackUrl });
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
      toast.error(`Failed to sign in with ${provider}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-input mx-auto mt-20 w-full max-w-md rounded-none bg-card p-4 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to your account to continue
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
            id="email"
            placeholder="Enter your email"
            type="email"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            id="password"
            placeholder="••••••••"
            type="password"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </LabelInputContainer>

        {/* Forgot Password Link */}
        <div className="mb-6 text-right">
          <Link
            href="#"
            className="text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            Forgot password?
          </Link>
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-primary-foreground shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]  dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in →"}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-secondary px-4 font-medium text-secondary-foreground dark:shadow-[0px_0px_1px_1px_#262626] disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={() => handleOAuthSignIn("google")}
            disabled={isLoading}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-secondary px-4 font-medium text-secondary-foreground dark:shadow-[0px_0px_1px_1px_#262626] disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={() => handleOAuthSignIn("github")}
            disabled={isLoading}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don&apost have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-neutral-800 hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-400"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
