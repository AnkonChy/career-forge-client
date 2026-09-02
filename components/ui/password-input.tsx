"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, id = "password", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={id} className="text-[#1a1a1a] text-sm font-medium">
            {label}
          </Label>
        )}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
          <Input
            id={id}
            type={showPassword ? "text" : "password"}
            className={cn("h-11 pl-10 pr-10 border-[#e0e0e0] rounded-lg", className)}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-gray-600 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
