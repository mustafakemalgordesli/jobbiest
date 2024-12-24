'use client'
import { Button } from "@/components/ui/button"
import { useFormStatus } from 'react-dom'
import { ReloadIcon } from "@radix-ui/react-icons"

export function SubmitButton({ children }: {
    children:
    React.ReactNode
}) {
    const { pending } = useFormStatus()

    return (
        <>
            <Button type="submit" disabled={pending} className="w-full">
                {pending ? <>
                    <ReloadIcon className="mr-1 h-4 w-4 animate-spin" />
                    Please wait</> : children}
            </Button >
        </>
    )
}