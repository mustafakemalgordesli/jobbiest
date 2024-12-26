"use server";

import prisma from "@/lib/prisma";
import { verifyJwtToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GetJobs() {
    try {
        const cookieStore = await cookies();

        const payload = await verifyJwtToken(cookieStore.get("token")?.value || "");
        
        if (!payload)
            return null;

        const user = await prisma.user.findFirst({
            where: {
                id: payload.id
            }
        }) 
        
        if (!user || !user.companyId) return null;

        return await prisma.job.findMany({
            where: {
                companyId: user.companyId,
                isDeleted: false
            }
        })
    } catch (error) {
        return null;
    }
}