"use client";

import { useJobStore } from "@/stores/job-store";
import { useEffect, useState } from "react";
import { GetJobsByPaged } from "@/actions/jobs/get-jobs";
import { JobSearch } from "@/components/job-search";
import { Button } from "@/components/ui/button";
import { JobListing } from "@/components/job-listing";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SearchJobs() {
  const { jobs, update: updateJobs, addRange } = useJobStore();

  const [page, SetPage] = useState(1);
  const [loading, SetLoading] = useState(false);
  const [search, SetSearch] = useState("")

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    const jobs = await GetJobsByPaged();
    if (jobs != null) updateJobs(jobs);
  };

  const loadMoreJobs = async () => {
    SetLoading(true);
    const jobs = await GetJobsByPaged(page + 1, 9, search);
    if (jobs != null) addRange(jobs);
    SetPage(s => s+1);
    SetLoading(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 mx-auto max-w-2xl text-center">Search Jobs</h1>
      <JobSearch  page={page} SetPage={SetPage} SetSearch={SetSearch}/>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job: any) => (
          <JobListing key={String(job.id)} job={job} footer={null}/>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center my-2">
        {loading && <LoadingSpinner className="my-2"/>}
        <Button onClick={loadMoreJobs}>More Jobs</Button>
        </div>
    </div>
  );
}

const LoadingSpinner = ({className = ""}: any) => {
  return <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
}