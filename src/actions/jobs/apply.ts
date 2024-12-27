"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";

const jobApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  resume: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, `Max file size is 5MB.`),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters"),
});

export async function ApplyJob(
  prevState: { isSuccess: boolean | null; message: string; jobId: string },
  formData: FormData
) {
  try {
    const job = await prisma.job.findFirst({
      where: {
        id: prevState.jobId,
      },
    });

    if (!job) return { isSuccess: false, message: "Job is not found", jobId: "" };

    console.log(prevState);
    console.log(formData);
    return {
      isSuccess: false,
      message: "",
      jobId: "",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: "",
      jobId: "",
    };
  }
}
