import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
      <h1 className="text-4xl font-bold mb-6">Welcome to Jobiest</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Create and share job postings efficiently for businesses of all sizes. Our minimalist platform helps you reach the right candidates faster.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/post-job">Post a Job</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/search">Search Jobs</Link>
        </Button>
      </div>
    </div>
  )
}
