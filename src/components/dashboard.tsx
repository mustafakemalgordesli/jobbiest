'use client'

import { useState, useEffect } from 'react'
import { JobListing } from '@/components/job-listing'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Job {
  id: string
  title: string
  company: string
  location: string
  salaryRange: string
  description: string
  status: 'active' | 'expired'
}

export function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [activeTab, setActiveTab] = useState('active')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs')
      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  const handleDeleteJob = async (id: string) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete job')
      }
      setJobs(jobs.filter(job => job.id !== id))
    } catch (error) {
      console.error('Error deleting job:', error)
    }
  }

  const filteredJobs = jobs.filter(job => job.status === activeTab)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="expired">Expired Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          {filteredJobs.map(job => (
            <div key={job.id} className="mb-4">
              <JobListing {...job} />
              <Button variant="destructive" onClick={() => handleDeleteJob(job.id)} className="mt-2">
                Delete Job
              </Button>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="expired">
          {filteredJobs.map(job => (
            <div key={job.id} className="mb-4">
              <JobListing {...job} />
              <Button variant="destructive" onClick={() => handleDeleteJob(job.id)} className="mt-2">
                Delete Job
              </Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

