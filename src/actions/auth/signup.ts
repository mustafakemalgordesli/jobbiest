"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { createJwtToken } from "@/lib/utils";
import { redirect } from "next/navigation";


const EXP_TIME = 24 * 60 * 60 * 30;

const createSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password is required" })
    .min(6, { message: "Password is required" }),
  email: z
    .string({ invalid_type_error: "Email is required" })
    .email("This is not a valid email."),
});

export async function SignUpAction(prevState: any, formData: FormData) {
  try {
    const isValidData = createSchema.parse({
      email: formData.get("email"),
      password: formData.get("password")
    });

    const user = await prisma.user.findFirst({
      where: {
        email: isValidData.email,
      },
    });

    if (user)
      return {
        email: "This email address already exists",
        password: "",
      };

    const hash = await bcrypt.hash(isValidData.password, 10);

    const savedUser = await prisma.user.create({
      data: {
        email: isValidData.email,
        password: hash,
      },
      select: {
        email: true,
        id: true,
      },
    });

    const token = await createJwtToken({
      id: savedUser.id,
      email: savedUser.email,
    });

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: EXP_TIME,
    });
  } catch (err) {
    if (err instanceof Error && err.name == "ZodError") {
      const errors = {
        email: "",
        password: "",
      };

      [...JSON.parse(err.message)].forEach((item) => {
        if (item?.path[0] == "email") {
          errors.email = item?.message || "";
        }
        if (item?.path[0] == "password") {
          errors.password = item?.message || "";
        }
      });

      return errors;
    }
    return {
      email: "",
      password: "",
    };
  }

  redirect("/dashboard");
}