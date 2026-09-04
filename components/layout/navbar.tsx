"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Flame, Menu, LogOut, User as UserIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuth } from "@/store/useAuthStore";

const NAV_LINKS = [
  { href: "/jobs", label: "Find jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/resources", label: "Resources" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoaded, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const displayName =
    user?.firstName ||
    user?.first_name ||
    (user?.email ? user.email.split("@")[0] : "User");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/85 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 dark:bg-white">
            <Flame className="h-4.5 w-4.5 text-orange-500" strokeWidth={2.25} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-white">
            Career Forge
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                  active && "text-neutral-900 dark:text-white",
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-orange-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex min-w-[140px] justify-end">
          {!isLoaded ? (
            <div className="h-9 w-36 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <UserIcon className="h-4 w-4 text-neutral-500" />
                {displayName}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="cursor-pointer gap-1.5"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                <Link href="/signin">Get started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900 dark:bg-white">
                <Flame className="h-4 w-4 text-orange-500" strokeWidth={2.25} />
              </span>
              Career Forge
            </SheetTitle>

            <nav className="mt-8 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
                      pathname === link.href &&
                        "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200 pt-6 dark:border-neutral-800">
              {!isLoaded ? (
                <div className="h-9 w-full animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800" />
              ) : isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-neutral-500" />
                    <span>{displayName}</span>
                  </div>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full cursor-pointer justify-center gap-1.5"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </SheetClose>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button variant="outline" asChild>
                      <Link href="/login">Log in</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      <Link href="/signin">Get started</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
