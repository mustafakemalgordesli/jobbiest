import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { SignJWT } from 'jose';
import { getJwtSecretKey } from '@/lib/auth';

export async function createJwtToken(payload: {
    id: string;
    email: string;
}) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(getJwtSecretKey());
}