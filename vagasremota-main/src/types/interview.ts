export type InterviewStatus = "scheduled" | "in_progress" | "completed" | "cancelled"

export type InterviewType = "initial" | "technical" | "behavioral" | "final" | "team"

export interface InterviewFeedback {
  id: string
  interviewId: string
  interviewerId: string
  candidateId: string
  jobId: string
  rating: number
  strengths: string[]
  weaknesses: string[]
  notes: string
  recommendation: "hire" | "reject" | "consider"
  technicalScore?: number
  communicationScore?: number
  problemSolvingScore?: number
  culturalFitScore?: number
  createdAt: Date
  isShared: boolean
}

export interface Interview {
  id: string
  jobId: string
  candidateId: string
  interviewerId: string
  type: InterviewType
  status: InterviewStatus
  scheduledAt: Date
  duration: number // em minutos
  meetingLink?: string
  meetingPassword?: string
  feedback?: InterviewFeedback
  createdAt: Date
  updatedAt: Date
  cancelledAt?: Date
  cancelledBy?: string
  cancelledReason?: string
  completedAt?: Date
  recordingUrl?: string
  notes?: string
  requirements?: string[]
  questions?: string[]
  isRecorded: boolean
  isPrivate: boolean
} 