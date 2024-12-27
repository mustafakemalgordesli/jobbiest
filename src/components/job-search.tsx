"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GetJobsByPaged } from "@/actions/jobs/get-jobs";
import { useJobStore } from "@/stores/job-store";

export function JobSearch({ page, SetPage, SetSearch }: any) {
  const { update: updateJobs} = useJobStore();

  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const jobs = await GetJobsByPaged(1, 9, query);
    if (jobs != null) updateJobs(jobs);
    SetPage(1);
    SetSearch(query);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await handleSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
      <Input
        placeholder="Search jobs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow"
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
