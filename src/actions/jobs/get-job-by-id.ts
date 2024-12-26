import prisma from "@/lib/prisma";

export async function GetJobById(id: string) {
    try {
        return await prisma.job.findFirst({
            where: {
                id: id
            }
        })
    } catch (error) {
        return null;        
    }
}