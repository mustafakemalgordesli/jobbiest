import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          JobFlow
        </Link>
        <nav className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/post-job">Post a Job</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/search">Search Jobs</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

