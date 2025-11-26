"use client";

import React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BottomGradient } from "./BottomGradient";
import { LabelInputContainer } from "./LabelInputContainer";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to register");
        return;
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      if (signInResult?.error) {
        toast.error(signInResult.error);
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");
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
      await signIn(provider, {
        callbackUrl: provider === "google" ? "/" : undefined,
      });
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
      toast.error(`Failed to sign up with ${provider}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-input mx-auto mt-20 w-full max-w-md rounded-none bg-card p-4 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Byte Tools
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Sign up for an account to get started
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              {...register("firstName", {
                required: "Please enter your first name",
              })}
              id="firstname"
              placeholder="Firstname"
              type="text"
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              {...register("lastName", {
                required: "Please enter your last name",
              })}
              id="lastname"
              placeholder="Lastname"
              type="text"
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </LabelInputContainer>
        </div>

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
              required: "Please enter a password",
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

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-primary-foreground shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]  dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign up →"}
          <BottomGradient />
        </button>

        <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

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

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-neutral-800 hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-400"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
