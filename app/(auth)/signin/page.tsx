"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import useAxiosPublic from "@/app/hooks/useAxiosPublic";

type SignupInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    try {
      const response = await axiosPublic.post("/api/auth/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      console.log(response);

      reset();

      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const { errors: fieldErrors, message } = error.response.data;

        if (fieldErrors) {
          if (fieldErrors.firstName || fieldErrors.first_name) {
            setError("firstName", {
              message: fieldErrors.firstName || fieldErrors.first_name,
            });
          }
          if (fieldErrors.lastName || fieldErrors.last_name) {
            setError("lastName", {
              message: fieldErrors.lastName || fieldErrors.last_name,
            });
          }
          if (fieldErrors.email) {
            setError("email", { message: fieldErrors.email });
          }
          if (fieldErrors.password) {
            setError("password", { message: fieldErrors.password });
          }
          if (fieldErrors.confirmPassword) {
            setError("confirmPassword", {
              message: fieldErrors.confirmPassword,
            });
          }
        } else if (message) {
          setError("email", { message });
        }
      }
    }
  };

  return (
    <div className="signup min-h-screen flex flex-col justify-between p-6 sm:p-8 lg:p-12 bg-white">
      <div className="flex-1 flex items-center justify-center my-8">
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              Create an account
            </h1>
            <p className="text-[#666666] text-base">
              Welcome! Please enter your details to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label
                  htmlFor="firstName"
                  className="text-[#1a1a1a] text-sm font-medium"
                >
                  First Name
                </Label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                  <Input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className="h-11 pl-10 border-[#e0e0e0] rounded-lg"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="lastName"
                  className="text-[#1a1a1a] text-sm font-medium"
                >
                  Last Name
                </Label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                  <Input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="h-11 pl-10 border-[#e0e0e0] rounded-lg"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-[#1a1a1a] text-xs font-medium"
              >
                Email
              </Label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                <Input
                  {...register("email", { required: "Email is required" })}
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="h-11 pl-10 border-[#e0e0e0] rounded-lg"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <PasswordInput
                {...register("password", { required: "Password is required" })}
                id="password"
                label="Password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <PasswordInput
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                showToggle={false}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#05364c] hover:bg-[#042637] text-white font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-[#666666]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1a1a1a] font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <p className="text-[#666666] text-sm text-center">
          © 2026 MedNinja Technologies Inc.
        </p>
      </div>
    </div>
  );
}
