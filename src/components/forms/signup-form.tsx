"use client";

import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../submit-button";
import { SignUpAction } from "@/actions/auth/signup";
import { useActionState } from "react";

const initialState = {
  issuccess: null,
  message: "",
  email: "",
  password: "",
};

export default function SignupForm() { 
  const [state, formAction, pending] = useActionState(SignUpAction, initialState);
    
  return (
    <Form action={formAction} className="space-y-4">
      {/* <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" type="text" required />
      </div> */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <SubmitButton>Sign Up</SubmitButton>
    </Form>
  );
}
