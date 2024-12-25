"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCompanyForm } from "./forms/create-company-form";
import ErrorBoundary from "./error-boundary";
import { useCompanyStore } from "@/stores/company-store";
import { GetCompany } from "@/actions/company/get-company";
import CompanyCard from "./company-card";

export function Dashboard() {
  const { company, update } = useCompanyStore();

  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    const company = await GetCompany();
    update(company);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="company" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
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
        <TabsContent value="active"></TabsContent>
        <TabsContent value="team"></TabsContent>
      </Tabs>
    </div>
  );
}
