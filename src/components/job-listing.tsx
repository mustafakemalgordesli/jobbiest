import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JobModel from "@/models/job";

export function JobListing({
  job,
  footer = null,
}: {
  job: JobModel;
  footer: any | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.companyId}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{job.subtitle}</Badge>
          {/* <Badge variant="secondary">{salaryRange}</Badge> */}
        </div>
        <p className="text-sm text-muted-foreground">{job.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {footer ? (
          footer 
        ) : (
          <Button asChild>
            <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
