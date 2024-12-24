import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface JobListingProps {
  id: string
  title: string
  company: string
  location: string
  salaryRange: string
  description: string
}

export function JobListing({ id, title, company, location, salaryRange, description }: JobListingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{location}</Badge>
          <Badge variant="secondary">{salaryRange}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline">
          <Link href={`/job/${id}`}>View Details</Link>
        </Button>
        <Button asChild>
          <Link href={`/jobs/${id}/apply`}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

