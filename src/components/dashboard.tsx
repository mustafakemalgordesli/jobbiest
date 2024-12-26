"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCompanyForm } from "./forms/create-company-form";
import ErrorBoundary from "./error-boundary";
import { useCompanyStore } from "@/stores/company-store";
import { GetCompany } from "@/actions/company/get-company";
import CompanyCard from "./company-card";
import { useJobStore } from "@/stores/job-store";
import { JobListing } from "./job-listing";
import { JobPostingForm } from "./forms/job-posting-form";
import { GetJobs } from "@/actions/jobs/get-jobs";

export function Dashboard() {
  const { company, update } = useCompanyStore();
  const { jobs, update: updateJobs  } = useJobStore();

  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    getCompany();
    getJobs();
  }, []);

  const getCompany = async () => {
    const company = await GetCompany();
    update(company);
  };

  const getJobs = async () => {
    const jobs = await GetJobs()
    if (jobs != null) updateJobs(jobs)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="company" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="create-job">Create Job</TabsTrigger>
          <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="company">
          {company ? (
            <CompanyCard />
          ) : (
            <ErrorBoundary>
              <CreateCompanyForm />
            </ErrorBoundary>
          )}
        </TabsContent>
        <TabsContent value="team"></TabsContent>
        <TabsContent value="create-job">
          <JobPostingForm />
        </TabsContent>
        <TabsContent value="jobs" className="max-w-2xl">
          {
            jobs.map(job => <JobListing key={String(job?.id)} job={job}/>)
          }
        </TabsContent>
      </Tabs>
    </div>
  );
}
