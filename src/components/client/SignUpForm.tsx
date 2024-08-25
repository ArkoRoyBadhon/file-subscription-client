"use client";

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
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
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

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await registerUser(data).unwrap();

      if (response.success) {
        router.push("/login");
      }

      if(response.duplicate) {
        toast.error("Email or Username Already Existed")
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your details below to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register("email")}
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
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        {isError && (
          <p className="text-red-500 mt-4">
            {(error as any)?.data?.message || "Something went wrong!"}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <span>Already have an account?</span>
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
