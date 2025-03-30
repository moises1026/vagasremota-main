export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  description?: string
  isCurrent: boolean
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: Date
  endDate?: Date
  description: string
  skills: string[]
  achievements?: string[]
  isCurrent: boolean
}

export interface Skill {
  name: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  yearsOfExperience?: number
}

export interface Language {
  name: string
  level: "basic" | "intermediate" | "advanced" | "native"
  certificate?: string
}

export interface SocialMedia {
  linkedin?: string
  github?: string
  portfolio?: string
  youtube?: string
}

export interface CandidateProfile {
  id: string
  userId: string
  fullName: string
  email: string
  phone?: string
  location?: string
  bio?: string
  avatar?: string
  resume?: string
  videoPresentation?: string
  skills: Skill[]
  languages: Language[]
  education: Education[]
  experience: Experience[]
  socialMedia: SocialMedia
  availability: {
    startDate?: Date
    noticePeriod?: number
    preferredSchedule?: "fullTime" | "partTime" | "flexible"
    remote: boolean
    hybrid: boolean
    onsite: boolean
  }
  salary: {
    current?: number
    expected: {
      min: number
      max: number
    }
  }
  interests: string[]
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
  views: number
  applications: number
  interviews: number
  offers: number
} 