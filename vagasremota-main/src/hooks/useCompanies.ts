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
import { CompanyProfile } from "@/types/company"

interface UseCompaniesOptions {
  limit?: number
  filters?: {
    industry?: string[]
    size?: string[]
    location?: string
    verified?: boolean
  }
}

export function useCompanies(options: UseCompaniesOptions = {}) {
  const { user } = useAuth()
  const [companies, setCompanies] = useState<CompanyProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [lastVisible, setLastVisible] = useState<any>(null)

  const fetchCompanies = async (reset = false) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      let q = query(collection(db, "companies"))

      if (options.filters) {
        const { industry, size, location, verified } = options.filters

        if (industry?.length) {
          q = query(q, where("industry", "in", industry))
        }

        if (size?.length) {
          q = query(q, where("size", "in", size))
        }

        if (location) {
          q = query(q, where("location.city", "==", location))
        }

        if (verified !== undefined) {
          q = query(q, where("verified", "==", verified))
        }
      }

      q = query(q, orderBy("createdAt", "desc"), limit(options.limit || 10))

      if (!reset && lastVisible) {
        q = query(q, startAfter(lastVisible))
      }

      const snapshot = await getDocs(q)
      const newCompanies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as CompanyProfile[]

      setCompanies((prev) => (reset ? newCompanies : [...prev, ...newCompanies]))
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === (options.limit || 10))
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompanies(true)
  }, [options.filters])

  const createCompany = async (
    company: Omit<CompanyProfile, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const docRef = await addDoc(collection(db, "companies"), {
        ...company,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return docRef.id
    } catch (err) {
      throw err
    }
  }

  const updateCompany = async (
    id: string,
    company: Partial<CompanyProfile>
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const companyRef = doc(db, "companies", id)
      await updateDoc(companyRef, {
        ...company,
        updatedAt: new Date(),
      })
    } catch (err) {
      throw err
    }
  }

  const deleteCompany = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const companyRef = doc(db, "companies", id)
      await deleteDoc(companyRef)
    } catch (err) {
      throw err
    }
  }

  return {
    companies,
    loading,
    error,
    hasMore,
    fetchMore: () => fetchCompanies(false),
    createCompany,
    updateCompany,
    deleteCompany,
  }
} 