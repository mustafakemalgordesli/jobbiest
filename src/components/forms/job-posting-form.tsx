"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCompanyStore } from "@/stores/company-store";
import { SubmitButton } from "../submit-button";
import { useActionState, useEffect } from "react";
import { CreateJob } from "@/actions/jobs/create-job";
import { useJobStore } from "@/stores/job-store";
import { GetJobById } from "@/actions/jobs/get-job-by-id";
import { useToast } from "@/hooks/use-toast";

const initialState: {
  isSuccess: boolean | null;
  message: string;
  jobId: string
} = {
  isSuccess: null,
  message: "",
  jobId: ""
};

export function JobPostingForm() {
  const { toast } = useToast();
  const { company, update } = useCompanyStore();
  const { add } = useJobStore();

  const [state, formAction, pending] = useActionState(CreateJob, {
    ...initialState,
    companyId: String(company?.id || ""),
  });

  const addJobStore = async () => {
    const job = await GetJobById(state.jobId)
    if (job != null) add(job)
  }

  useEffect(() => {
    if(state.isSuccess == true) {
      toast({
        description: "Job is created",
      })
      addJobStore();
    } else if(state.isSuccess == false){
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      })
    }
  }, [state])

  return company ? (
    <form action={formAction} className="space-y-8 max-w-2xl">
      <div className="relative">
        <Label htmlFor="title">Title</Label>
        <div className="relative flex items-center">
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Enter job title"
          />
        </div>
      </div>
      <div className="relative">
        <Label htmlFor="subtitle">Subtitle</Label>
        <div className="relative flex items-center">
          <Input
            id="subtitle"
            name="subtitle"
            type="text"
            placeholder="Enter job subtitle"
          />
        </div>
      </div>
      <div className="relative">
        <Label htmlFor="description">Descriptiom</Label>
        <div className="relative flex items-center">
          <Textarea
            name="description"
            id="description"
            placeholder="Enter job descriptions"
          />
        </div>
      </div>
      <SubmitButton>Create Job</SubmitButton>
    </form>
  ) : (
    <p>You must first define the company</p>
  );
}
