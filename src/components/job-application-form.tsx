"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SubmitButton } from "./submit-button";
import { ApplyJob } from "@/actions/jobs/apply";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

const initialState: {
  jobId: string;
  jobTitle: string;
  isSuccess: boolean | null;
  message: string;
} = {
  jobId: "",
  jobTitle: "",
  isSuccess: null,
  message: "",
};

export function JobApplicationForm({
  jobId,
  jobTitle,
}: JobApplicationFormProps) {
  const { toast } = useToast();
  
  const [state, formAction, pending] = useActionState(ApplyJob, {
    ...initialState,
    jobId: jobId,
    jobTitle: jobTitle,
  });

  return (
    <form action={formAction} className="space-y-8">
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

      {/* <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  {...field}
                />
              </FormControl>
              <FormDescription>Upload your resume (PDF format, max 5MB)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us why you're interested in this position and what makes you a great candidate."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      <SubmitButton>Submit Application</SubmitButton>
    </form>
  );
}
