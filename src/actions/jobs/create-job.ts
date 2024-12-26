"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";

const createJobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  subtitle: z.string(),
  description: z.string(),
});

export async function CreateJob(
  prevState: { companyId: string; isSuccess: boolean | null; message: string, jobId: string },
  formData: FormData
) {
  try {
    const company = await prisma.company.findFirst({
      where: {
        id: prevState.companyId,
      },
    });

    if (!company)
      return {
        isSuccess: false,
        message: "Job does not created",
        companyId: prevState.companyId,
        jobId: ""
      };

    const isValidData = createJobSchema.parse({
      title: formData.get("title"),
      subtitle: formData.get("subtitle"),
      description: formData.get("description"),
    });

    const job = await prisma.job.create({
      data: {
        ...isValidData,
        companyId: company.id,
      },
    });

    return {
      isSuccess: true,
      message: "",
      companyId: prevState.companyId,
      jobId: job.id
    };
  } catch (err) {
    return {
      isSuccess: false,
      message: "Job does not created",
      companyId: prevState.companyId,
      jobId: ""
    };
  }
}
