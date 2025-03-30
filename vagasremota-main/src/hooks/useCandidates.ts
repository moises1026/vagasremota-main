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
import { CandidateProfile } from "@/types/candidate"

interface UseCandidatesOptions {
  limit?: number
  jobId?: string
  filters?: {
    skills?: string[]
    experience?: number
    education?: string[]
    languages?: string[]
  }
}

export function useCandidates(options: UseCandidatesOptions = {}) {
  const { user } = useAuth()
  const [candidates, setCandidates] = useState<CandidateProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [lastVisible, setLastVisible] = useState<any>(null)

  const fetchCandidates = async (reset = false) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      let q = query(collection(db, "candidates"))

      if (options.jobId) {
        q = query(q, where("appliedJobs", "array-contains", options.jobId))
      }

      if (options.filters) {
        const { skills, experience, education, languages } = options.filters

        if (skills?.length) {
          q = query(q, where("skills", "array-contains-any", skills))
        }

        if (experience) {
          q = query(q, where("experience.years", ">=", experience))
        }

        if (education?.length) {
          q = query(q, where("education.degree", "in", education))
        }

        if (languages?.length) {
          q = query(q, where("languages.name", "in", languages))
        }
      }

      q = query(q, orderBy("createdAt", "desc"), limit(options.limit || 10))

      if (!reset && lastVisible) {
        q = query(q, startAfter(lastVisible))
      }

      const snapshot = await getDocs(q)
      const newCandidates = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as CandidateProfile[]

      setCandidates((prev) => (reset ? newCandidates : [...prev, ...newCandidates]))
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === (options.limit || 10))
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCandidates(true)
  }, [options.filters])

  const createCandidate = async (
    candidate: Omit<CandidateProfile, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const docRef = await addDoc(collection(db, "candidates"), {
        ...candidate,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return docRef.id
    } catch (err) {
      throw err
    }
  }

  const updateCandidate = async (
    id: string,
    candidate: Partial<CandidateProfile>
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const candidateRef = doc(db, "candidates", id)
      await updateDoc(candidateRef, {
        ...candidate,
        updatedAt: new Date(),
      })
    } catch (err) {
      throw err
    }
  }

  const deleteCandidate = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const candidateRef = doc(db, "candidates", id)
      await deleteDoc(candidateRef)
    } catch (err) {
      throw err
    }
  }

  return {
    candidates,
    loading,
    error,
    hasMore,
    fetchMore: () => fetchCandidates(false),
    createCandidate,
    updateCandidate,
    deleteCandidate,
  }
} 