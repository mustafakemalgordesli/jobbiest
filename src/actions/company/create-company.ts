"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { verifyJwtToken } from "@/lib/auth";
import { cookies } from "next/headers";

const createSchema = z.object({
  // name: z
  //   .string(),
  // website: z
  //   .string(),
  // description: z
  //   .string(),
  email: z
    .string({
      invalid_type_error: "Email is required",
      required_error: "Email is required",
    })
    .email("This is not a valid email."),
});

export async function CreateCompany(prevState: any, formData: FormData) {
  try {
    const cookieStore = await cookies();
    const payload = await verifyJwtToken(cookieStore.get("token")?.value || "");

    if (!payload)
      return {
        isSuccess: false,
        message: "Company does not created",
        id: "",
      };

    const isValidData = createSchema.parse({
      email: formData.get("email"),
      // name: formData.get("name"),
      // website: formData.get("website"),
      // description: formData.get("description")
    });

    const logo = formData.get("logo")

    let logoUrl = "";

    if (logo instanceof File && logo.size > 0) {
      const blob = await put(logo.name, logo, {
        access: "public",
      });
      logoUrl = blob.url;
    }
    

    const company = await prisma.company.create({
      data: { ...isValidData, name: "d", logo: logoUrl },
    });

    console.log(company)

    const hr = await prisma.user.update({
      where: {
        id: payload.id
      },
      data: {
        companyId: company.id,
      }
    })
    return {
      isSuccess: true,
      message: ""
    }
  } catch (err) {
    return {
      isSuccess: false,
      message: "Company does not created",
    };
  }

}
