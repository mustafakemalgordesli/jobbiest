'use client'

import { useState } from 'react'
import { JobSearch } from '@/components/job-search'
import { JobListing } from '@/components/job-listing'

export default function SearchJobs() {
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async (query: string, category: string, location: string) => {
    try {
      const response = await fetch(`/api/search?query=${query}&category=${category}&location=${location}`)
      if (!response.ok) {
        throw new Error('Failed to fetch search results')
      }
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error searching jobs:', error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Jobs</h1>
      <JobSearch onSearch={handleSearch} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((job: any) => (
          <JobListing key={job.id} {...job} />
        ))}
      </div>
    </div>
  )
}

