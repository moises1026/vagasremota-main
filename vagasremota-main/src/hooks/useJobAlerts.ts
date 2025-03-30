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
import { JobAlert } from "@/types/jobAlert"

interface UseJobAlertsOptions {
  limit?: number
  userId?: string
  isActive?: boolean
}

export function useJobAlerts(options: UseJobAlertsOptions = {}) {
  const { user } = useAuth()
  const [alerts, setAlerts] = useState<JobAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [lastVisible, setLastVisible] = useState<any>(null)

  const fetchAlerts = async (reset = false) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      let q = query(collection(db, "jobAlerts"))

      if (options.userId) {
        q = query(q, where("userId", "==", options.userId))
      }

      if (options.isActive !== undefined) {
        q = query(q, where("isActive", "==", options.isActive))
      }

      q = query(q, orderBy("createdAt", "desc"), limit(options.limit || 10))

      if (!reset && lastVisible) {
        q = query(q, startAfter(lastVisible))
      }

      const snapshot = await getDocs(q)
      const newAlerts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        lastNotification: doc.data().lastNotification?.toDate(),
      })) as JobAlert[]

      setAlerts((prev) => (reset ? newAlerts : [...prev, ...newAlerts]))
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === (options.limit || 10))
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts(true)
  }, [options.isActive])

  const createAlert = async (
    alert: Omit<JobAlert, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const docRef = await addDoc(collection(db, "jobAlerts"), {
        ...alert,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return docRef.id
    } catch (err) {
      throw err
    }
  }

  const updateAlert = async (id: string, alert: Partial<JobAlert>) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const alertRef = doc(db, "jobAlerts", id)
      await updateDoc(alertRef, {
        ...alert,
        updatedAt: new Date(),
      })
    } catch (err) {
      throw err
    }
  }

  const deleteAlert = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const alertRef = doc(db, "jobAlerts", id)
      await deleteDoc(alertRef)
    } catch (err) {
      throw err
    }
  }

  return {
    alerts,
    loading,
    error,
    hasMore,
    fetchMore: () => fetchAlerts(false),
    createAlert,
    updateAlert,
    deleteAlert,
  }
} 