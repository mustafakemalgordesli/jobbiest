import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const jobId = formData.get('jobId')
    const fullName = formData.get('fullName')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const resume = formData.get('resume')
    const coverLetter = formData.get('coverLetter')

    console.log('Received job application:', { jobId, fullName, email, phone, resume, coverLetter })

    return NextResponse.json({ message: 'Job application submitted successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error submitting job application:', error)
    return NextResponse.json({ error: 'Failed to submit job application' }, { status: 500 })
  }
}
