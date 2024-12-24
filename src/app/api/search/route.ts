import { NextResponse } from 'next/server'

const mockJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salaryRange: '$100,000 - $150,000',
    description: 'We are seeking a talented software engineer to join our team...',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'New York, NY',
    salaryRange: '$90,000 - $130,000',
    description: 'Join our product team and help shape the future of our platform...',
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'DataDriven',
    location: 'Remote',
    salaryRange: '$110,000 - $160,000',
    description: 'We are looking for a data scientist to help us extract insights from our vast datasets...',
  },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')
  const category = searchParams.get('category')
  const location = searchParams.get('location')

  // In a real application, you would use these parameters to filter jobs from your database
  console.log('Search parameters:', { query, category, location })

  // For now, we'll just return all mock jobs
  return NextResponse.json(mockJobs)
}