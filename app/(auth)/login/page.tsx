"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi"; // or react-icons/hi
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useAxiosPublic from "@/app/hooks/useAxiosPublic";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await axiosPublic.post("/api/auth/login", {
        email: data.email,
        password: data.password,
        rememberMe,
      });

      if (response.data) {
        router.push("/");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError("email", { message: error.response.data.message });
      }
    }
  };

  return (
    <div className="login-page min-h-screen flex flex-col justify-between p-6 sm:p-8 lg:p-12 bg-white">
      <div className="flex-1 flex items-center justify-center my-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              Welcome back
            </h1>
            <p className="text-[#666666] text-base">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[#1a1a1a] text-sm font-medium"
              >
                Email
              </Label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                <Input
                  {...register("email", { required: "Email needed" })}
                  type="email"
                  placeholder="Your Email"
                  className="h-11 pl-10 border-[#e0e0e0] rounded-lg"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <PasswordInput
                {...register("password", {
                  required: "Password needed",
                })}
                id="password"
                label="Password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(Boolean(checked))
                  }
                  className="border-[#d1d1d1] data-[state=checked]:bg-[#05364c] data-[state=checked]:border-[#5c4b3a]"
                />
                <Label
                  htmlFor="remember"
                  className="text-[#1a1a1a] text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#05364c] hover:bg-[#042637] text-white font-medium rounded-lg transition-colors"
            >
              Log In
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-[#666666]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#1a1a1a] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <p className="text-[#666666] text-sm">
          © 2026 MedNinja Technologies Inc.
        </p>
      </div>
    </div>
  );
}
