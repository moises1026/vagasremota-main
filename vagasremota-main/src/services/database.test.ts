import { describe, it, expect, vi, beforeEach } from "vitest"
import { db } from "@/lib/firebase"
import {
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getJobs,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplication,
  getApplications,
  createCandidateProfile,
  updateCandidateProfile,
  deleteCandidateProfile,
  getCandidateProfile,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
} from "./database"

describe("Database Service", () => {
  const mockJob = {
    id: "123",
    title: "Software Engineer",
    companyId: "456",
    description: "Job description",
    requirements: ["React", "TypeScript"],
    salary: {
      min: 5000,
      max: 8000,
      currency: "BRL",
    },
    location: "Remote",
    type: "Full-time",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const mockApplication = {
    id: "789",
    jobId: "123",
    candidateId: "456",
    status: "pending",
    coverLetter: "Cover letter text",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const mockCandidateProfile = {
    id: "456",
    userId: "789",
    name: "John Doe",
    email: "john@example.com",
    phone: "+5511999999999",
    bio: "Software developer with 5 years of experience",
    skills: ["React", "TypeScript", "Node.js"],
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Developer",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2023-01-01"),
        description: "Led development team",
      },
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Computer Science",
        startDate: new Date("2015-01-01"),
        endDate: new Date("2019-01-01"),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const mockCompany = {
    id: "789",
    userId: "123",
    name: "Tech Corp",
    description: "Technology company",
    website: "https://techcorp.com",
    logo: "https://techcorp.com/logo.png",
    industry: "Technology",
    size: "50-200",
    location: "São Paulo, SP",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("Jobs", () => {
    it("creates a job successfully", async () => {
      const result = await createJob(mockJob)
      expect(result).toEqual(mockJob)
    })

    it("updates a job successfully", async () => {
      const updatedJob = { ...mockJob, title: "Senior Software Engineer" }
      const result = await updateJob(mockJob.id, updatedJob)
      expect(result).toEqual(updatedJob)
    })

    it("deletes a job successfully", async () => {
      await deleteJob(mockJob.id)
      const result = await getJob(mockJob.id)
      expect(result).toBeNull()
    })

    it("gets a job successfully", async () => {
      const result = await getJob(mockJob.id)
      expect(result).toEqual(mockJob)
    })

    it("gets jobs with filters", async () => {
      const filters = {
        location: "Remote",
        type: "Full-time",
        salary: { min: 5000 },
      }
      const result = await getJobs(filters)
      expect(result).toEqual([mockJob])
    })
  })

  describe("Applications", () => {
    it("creates an application successfully", async () => {
      const result = await createApplication(mockApplication)
      expect(result).toEqual(mockApplication)
    })

    it("updates an application successfully", async () => {
      const updatedApplication = { ...mockApplication, status: "accepted" }
      const result = await updateApplication(mockApplication.id, updatedApplication)
      expect(result).toEqual(updatedApplication)
    })

    it("deletes an application successfully", async () => {
      await deleteApplication(mockApplication.id)
      const result = await getApplication(mockApplication.id)
      expect(result).toBeNull()
    })

    it("gets an application successfully", async () => {
      const result = await getApplication(mockApplication.id)
      expect(result).toEqual(mockApplication)
    })

    it("gets applications for a job", async () => {
      const result = await getApplications(mockApplication.jobId)
      expect(result).toEqual([mockApplication])
    })
  })

  describe("Candidate Profiles", () => {
    it("creates a candidate profile successfully", async () => {
      const result = await createCandidateProfile(mockCandidateProfile)
      expect(result).toEqual(mockCandidateProfile)
    })

    it("updates a candidate profile successfully", async () => {
      const updatedProfile = { ...mockCandidateProfile, name: "John Smith" }
      const result = await updateCandidateProfile(mockCandidateProfile.id, updatedProfile)
      expect(result).toEqual(updatedProfile)
    })

    it("deletes a candidate profile successfully", async () => {
      await deleteCandidateProfile(mockCandidateProfile.id)
      const result = await getCandidateProfile(mockCandidateProfile.id)
      expect(result).toBeNull()
    })

    it("gets a candidate profile successfully", async () => {
      const result = await getCandidateProfile(mockCandidateProfile.id)
      expect(result).toEqual(mockCandidateProfile)
    })
  })

  describe("Companies", () => {
    it("creates a company successfully", async () => {
      const result = await createCompany(mockCompany)
      expect(result).toEqual(mockCompany)
    })

    it("updates a company successfully", async () => {
      const updatedCompany = { ...mockCompany, name: "New Tech Corp" }
      const result = await updateCompany(mockCompany.id, updatedCompany)
      expect(result).toEqual(updatedCompany)
    })

    it("deletes a company successfully", async () => {
      await deleteCompany(mockCompany.id)
      const result = await getCompany(mockCompany.id)
      expect(result).toBeNull()
    })

    it("gets a company successfully", async () => {
      const result = await getCompany(mockCompany.id)
      expect(result).toEqual(mockCompany)
    })
  })
}) 