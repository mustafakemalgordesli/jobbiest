import { JobApplicationForm } from '@/components/job-application-form'

async function getJobDetails(id: string) {
  // In a real application, you would fetch this data from your API or database
  return {
    id: "1",
    title: 'Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
  }
}

export default async function JobApplicationPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const job = await getJobDetails(id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Apply for {job.title}</h1>
      <p className="mb-4">
        <strong>Company:</strong> {job.company}
      </p>
      <p className="mb-8">
        <strong>Location:</strong> {job.location}
      </p>
      <JobApplicationForm jobId={job.id} jobTitle={job.title} />
    </div>
  )
}

