"use server";

import SignupForm from "@/components/forms/signup-form";
import Link from "next/link";

export default async function Signup() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
          Sign Up
        </h1>
        <SignupForm />
        <p className="mt-4 text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
