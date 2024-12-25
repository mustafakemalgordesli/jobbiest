"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "../submit-button";
import { CreateCompany } from "@/actions/company/create-company";
import { useActionState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useCompanyStore } from "@/stores/company-store";
import { GetCompany } from '@/actions/company/get-company'

const initialState: {
  isSuccess: boolean | null;
  message: string;
} = {
  isSuccess: null,
  message: "",
};

export function CreateCompanyForm() {
  const [state, formAction, pending] = useActionState(
    CreateCompany,
    initialState
  );

  useEffect(() => {
    console.log("BURADA", state.isSuccess)
    if(state.isSuccess) {
      getCompany()
    }
  }, [state.isSuccess])

  const {company, update} = useCompanyStore();

  const getCompany = async () => {
    const company = await GetCompany();
    console.log(company)
    update(company)
  }

  return (
    <form action={formAction} className="space-y-8 max-w-2xl">
      <div className="relative">
        <Label htmlFor="email">Email</Label>
        <div className="relative flex items-center">
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        {/* {state?.email && <p className="text-xs font-medium text-red-600 mt-[2px]">{state?.email}</p>} */}
      </div>

      <div className="relative">
        <Label htmlFor="logo">Logo</Label>
        <div className="relative flex items-center">
          <Input
            id="logo"
            name="logo"
            accept="image/*"
            max-size="2000"
            type="file"
          />
        </div>
        {/* {state?.email && <p className="text-xs font-medium text-red-600 mt-[2px]">{state?.email}</p>} */}
      </div>

      <SubmitButton>Submit Application</SubmitButton>
    </form>
  );
}
