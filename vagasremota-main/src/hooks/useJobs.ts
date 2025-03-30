import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"
import { db } from "@/lib/firebase"
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { Job } from "@/types/job"

interface UseJobsOptions {
  limit?: number
  companyId?: string
  filters?: {
    type?: string[]
    level?: string[]
    location?: string
    remote?: boolean
    hybrid?: boolean
    onsite?: boolean
    salary?: {
      min: number
      max: number
    }
  }
}

export function useJobs(options: UseJobsOptions = {}) {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [lastVisible, setLastVisible] = useState<any>(null)

  const fetchJobs = async (reset = false) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      let q = query(collection(db, "jobs"))

      if (options.companyId) {
        q = query(q, where("companyId", "==", options.companyId))
      }

      if (options.filters) {
        const { type, level, location, remote, hybrid, onsite, salary } =
          options.filters

        if (type?.length) {
          q = query(q, where("type", "in", type))
        }

        if (level?.length) {
          q = query(q, where("level", "in", level))
        }

        if (location) {
          q = query(q, where("location", "==", location))
        }

        if (remote) {
          q = query(q, where("remote", "==", true))
        }

        if (hybrid) {
          q = query(q, where("hybrid", "==", true))
        }

        if (onsite) {
          q = query(q, where("onsite", "==", true))
        }

        if (salary) {
          q = query(
            q,
            where("salary.min", ">=", salary.min),
            where("salary.max", "<=", salary.max)
          )
        }
      }

      q = query(q, orderBy("createdAt", "desc"), limit(options.limit || 10))

      if (!reset && lastVisible) {
        q = query(q, startAfter(lastVisible))
      }

      const snapshot = await getDocs(q)
      const newJobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Job[]

      setJobs((prev) => (reset ? newJobs : [...prev, ...newJobs]))
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === (options.limit || 10))
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs(true)
  }, [options.filters])

  const createJob = async (job: Omit<Job, "id" | "createdAt" | "updatedAt">) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        ...job,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return docRef.id
    } catch (err) {
      throw err
    }
  }

  const updateJob = async (id: string, job: Partial<Job>) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const jobRef = doc(db, "jobs", id)
      await updateDoc(jobRef, {
        ...job,
        updatedAt: new Date(),
      })
    } catch (err) {
      throw err
    }
  }

  const deleteJob = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const jobRef = doc(db, "jobs", id)
      await deleteDoc(jobRef)
    } catch (err) {
      throw err
    }
  }

  return {
    jobs,
    loading,
    error,
    hasMore,
    fetchMore: () => fetchJobs(false),
    createJob,
    updateJob,
    deleteJob,
  }
} 