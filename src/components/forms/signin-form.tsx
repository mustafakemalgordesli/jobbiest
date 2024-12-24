"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../submit-button";
import { useActionState } from "react";
import { SignInAction } from "@/actions/auth/signin";

const initialState = {
  issuccess: null,
  message: "",
  email: "",
  password: "",
};

export default function SigninForm() {
  const [state, formAction, pending] = useActionState(
    SignInAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" required />
      </div>
      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
}
