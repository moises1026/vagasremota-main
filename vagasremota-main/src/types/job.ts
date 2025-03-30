export type JobType = "remote" | "hybrid" | "onsite"
export type JobLevel = "junior" | "midLevel" | "senior" | "lead" | "manager" | "director"

export interface Company {
  id: string
  name: string
  logo?: string
  description?: string
  website?: string
  location?: string
}

export interface Salary {
  min: number
  max: number
  currency: string
}

export interface Job {
  id: string
  title: string
  description: string
  type: JobType
  level: JobLevel
  location: string
  salary: Salary
  skills: string[]
  requirements: string[]
  benefits: string[]
  company: Company
  createdAt: Date
  updatedAt: Date
  status: "active" | "draft" | "closed"
  applicationsCount: number
  viewsCount: number
} 