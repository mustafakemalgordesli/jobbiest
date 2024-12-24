'use server'

import Link from 'next/link'
import SigninForm from '@/components/forms/signin-form'

export default async function SignIn() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">Sign In</h1>
        <SigninForm />
        <p className="mt-4 text-center text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

