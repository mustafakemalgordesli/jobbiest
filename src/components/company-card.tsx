"use client"

import Image from "next/image";
import { useCompanyStore } from "@/stores/company-store";

export default function CompanyCard() {
  const {company} = useCompanyStore();
  return <div className="max-w-2xl">
    {company?.logo && <Image src={String(company.logo)} alt="company logo" width={75} height={75}/>}
    <h1>{company?.name}</h1>
    <p>{company?.description}</p>
    <p>{company?.website}</p>
  </div>;
}
