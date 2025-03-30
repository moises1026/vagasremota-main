export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  description: string
  requirements: string[]
  benefits: string[]
  salary: {
    min: number
    max: number
    currency: string
  }
  createdAt: Date
  updatedAt: Date
  companyId: string
  status: 'active' | 'closed'
}

export interface Application {
  id: string
  jobId: string
  candidateId: string
  status: 'pending' | 'reviewed' | 'interviewed' | 'accepted' | 'rejected'
  createdAt: Date
  updatedAt: Date
  coverLetter?: string
  resumeUrl?: string
}

export interface CandidateProfile {
  id: string
  userId: string
  name: string
  email: string
  phone?: string
  location: string
  bio?: string
  skills: string[]
  experience: {
    company: string
    position: string
    startDate: Date
    endDate?: Date
    description: string
  }[]
  education: {
    institution: string
    degree: string
    field: string
    startDate: Date
    endDate?: Date
    description?: string
  }[]
  languages: {
    name: string
    level: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface Company {
  id: string
  userId: string
  name: string
  description: string
  website?: string
  logo?: string
  location: string
  industry: string
  size: string
  founded: number
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: Date
  read: boolean
}

export interface Subscription {
  id: string
  companyId: string
  plan: 'free' | 'basic' | 'pro'
  status: 'active' | 'cancelled' | 'expired'
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
} 