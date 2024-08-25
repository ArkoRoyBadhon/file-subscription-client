"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useLoginUserMutation } from "@/redux/features/auth/auth.api";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { setToken, setUser } from "@/redux/features/auth/auth.slice";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Invalid email address")
          .required("Email is required"),
        password: yup
          .string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      })
    ),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);
    try {
      const response = await loginUser(data).unwrap();

      if(response.success) {
        dispatch(setUser(response.data))
        dispatch(setToken(response.accessToken))

        router.push("/");
      }

    } catch (error: any) {
      setErrorMessage(error?.data?.message || "Failed to log in. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to log in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <span>Don&apos;t have an account?</span>
        <Link href="/signup">
          <Button variant="ghost" disabled={isLoading}>
            Sign Up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
