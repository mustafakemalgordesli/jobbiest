import { create } from 'zustand'
import CompanyModel from '@/models/company'

export interface CompanyStore {
  company: CompanyModel | null,
  update: (company: CompanyModel | null) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  company: null,
  update: (company) => set(() => ({company})),
}))