import { create } from 'zustand'
import JobModel from '@/models/job';

export interface JobStore {
  jobs: JobModel[],
  update: (jobs: JobModel[]) => void;
  add: (job: JobModel) => void;
  addRange: (jobs: JobModel[]) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  update: (jobs) => set(() => ({jobs})),
  add: (job) => set((state) => ({jobs: [...state.jobs, job]})),
  addRange: (jobs) => set((state) => ({jobs: [...state.jobs, ...jobs]}))
}))