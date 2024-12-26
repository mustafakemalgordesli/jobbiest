import { JobPostingForm } from '@/components/forms/job-posting-form'

export default function PostJob() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
      <JobPostingForm />
    </div>
  )
}

