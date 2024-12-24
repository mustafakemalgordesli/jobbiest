import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Here you would typically save the job posting to your database
    console.log('Received job posting:', body)
    return NextResponse.json({ message: 'Job posted successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error posting job:', error)
    return NextResponse.json({ error: 'Failed to post job' }, { status: 500 })
  }
}
