import { GetJobById } from '@/actions/jobs/get-job-by-id'
import { JobApplicationForm } from '@/components/forms/job-application-form'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default async function JobApplicationPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const job = await GetJobById(id)
  if(!job) notFound()

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      {job.company?.logo && <Image src={String(job.company.logo)} alt="company logo" width={80} height={80} className='rounded mb-4'/>}
      <h1 className="text-3xl font-bold mb-6">{job.title}</h1>
      <p className="mb-4">
        <strong>Company:</strong> {job.company.name}
      </p>
      <Badge variant="secondary" className='mb-4'>{job.subtitle}</Badge>
      
      <JobApplicationForm jobId={job.id} />
    </div>
  )
}

