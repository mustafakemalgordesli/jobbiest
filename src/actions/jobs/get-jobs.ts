"use server";

import prisma from "@/lib/prisma";
import { verifyJwtToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GetJobs() {
  try {
    const cookieStore = await cookies();

    const payload = await verifyJwtToken(cookieStore.get("token")?.value || "");

    if (!payload) return null;

    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!user || !user.companyId) return null;

    return await prisma.job.findMany({
      where: {
        companyId: user.companyId,
        isDeleted: false,
      },
    });
  } catch (error) {
    return null;
  }
}

export async function GetJobsByPaged(
  page: number = 1,
  size: number = 9,
  search: string = ""
) {
  try {
    console.log(search)
    const jobs = await prisma.job.findMany({
      skip: (page - 1) * size,
      take: size,
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            subtitle: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    });
    console.log(jobs)
    return jobs;
  } catch (error) {
    return null;
  }
}
