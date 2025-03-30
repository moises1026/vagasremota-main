import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'candidate' | 'company' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CandidateProfile {
  id: string;
  userId: string;
  fullName: string;
  title: string;
  bio: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    startDate: Timestamp;
    endDate?: Timestamp;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: Timestamp;
    endDate?: Timestamp;
    description: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  location: string;
  remote: boolean;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  availability: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Company {
  id: string;
  userId: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  industry: string;
  size: string;
  location: string;
  remote: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'entry' | 'mid' | 'senior' | 'lead' | 'manager' | 'director';
  location: string;
  remote: boolean;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  experience: string;
  education: string;
  status: 'active' | 'closed' | 'draft';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiresAt: Timestamp;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'pending' | 'reviewing' | 'interviewing' | 'offered' | 'rejected' | 'accepted';
  coverLetter: string;
  resume: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Subscription {
  id: string;
  companyId: string;
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'expired';
  startDate: Timestamp;
  endDate: Timestamp;
  cancelAtPeriodEnd: boolean;
  currentPeriodStart: Timestamp;
  currentPeriodEnd: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    jobs: number;
    applications: number;
    candidates: number;
    storage: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Message {
  id: string;
  chatId: string;
  content: string;
  senderId: string;
  readBy: string[];
  createdAt: Timestamp;
} 