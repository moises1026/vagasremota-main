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
import { Interview } from "@/types/interview"

interface UseInterviewsOptions {
  limit?: number
  jobId?: string
  candidateId?: string
  interviewerId?: string
  status?: string[]
  type?: string[]
}

export function useInterviews(options: UseInterviewsOptions = {}) {
  const { user } = useAuth()
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [lastVisible, setLastVisible] = useState<any>(null)

  const fetchInterviews = async (reset = false) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      let q = query(collection(db, "interviews"))

      if (options.jobId) {
        q = query(q, where("jobId", "==", options.jobId))
      }

      if (options.candidateId) {
        q = query(q, where("candidateId", "==", options.candidateId))
      }

      if (options.interviewerId) {
        q = query(q, where("interviewerId", "==", options.interviewerId))
      }

      if (options.status?.length) {
        q = query(q, where("status", "in", options.status))
      }

      if (options.type?.length) {
        q = query(q, where("type", "in", options.type))
      }

      q = query(q, orderBy("scheduledAt", "desc"), limit(options.limit || 10))

      if (!reset && lastVisible) {
        q = query(q, startAfter(lastVisible))
      }

      const snapshot = await getDocs(q)
      const newInterviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        scheduledAt: doc.data().scheduledAt?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Interview[]

      setInterviews((prev) => (reset ? newInterviews : [...prev, ...newInterviews]))
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === (options.limit || 10))
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInterviews(true)
  }, [options.status, options.type])

  const createInterview = async (
    interview: Omit<Interview, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const docRef = await addDoc(collection(db, "interviews"), {
        ...interview,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return docRef.id
    } catch (err) {
      throw err
    }
  }

  const updateInterview = async (
    id: string,
    interview: Partial<Interview>
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const interviewRef = doc(db, "interviews", id)
      await updateDoc(interviewRef, {
        ...interview,
        updatedAt: new Date(),
      })
    } catch (err) {
      throw err
    }
  }

  const deleteInterview = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const interviewRef = doc(db, "interviews", id)
      await deleteDoc(interviewRef)
    } catch (err) {
      throw err
    }
  }

  return {
    interviews,
    loading,
    error,
    hasMore,
    fetchMore: () => fetchInterviews(false),
    createInterview,
    updateInterview,
    deleteInterview,
  }
} 