'use client'

import { useState, useEffect } from 'react'
import { JobListing } from '@/components/job-listing'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreateCompanyForm } from './forms/create-company-form'
import ErrorBoundary from './error-boundary'
import { useCompanyStore } from "@/stores/company-store";
import { GetCompany } from '@/actions/company/get-company'

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
  const {company, update} = useCompanyStore();

  const [jobs, setJobs] = useState<Job[]>([])
  const [activeTab, setActiveTab] = useState('active')

  useEffect(() => {
    console.log("Company", company)
  }, [company])

  useEffect(() => {
    console.log("çalıştı")
    fetchJobs()
    getCompany()
  }, [])

  const getCompany = async () => {
      const company = await GetCompany();
      console.log(company)
      update(company)
  }

  const fetchJobs = async () => {
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
      <h1 className="text-3xl font-bold mb-6">Dashboard {company?.id}</h1>
      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="expired">Expired Jobs</TabsTrigger>
          <TabsTrigger value="create-company">Create Company</TabsTrigger>
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
        <TabsContent value="create-company">
          <ErrorBoundary>
            <CreateCompanyForm />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  )
}

