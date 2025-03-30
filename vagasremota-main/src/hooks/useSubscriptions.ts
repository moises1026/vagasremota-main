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
import { SubscriptionPlanDetails } from "@/types/subscription"

interface UseSubscriptionsOptions {
  limit?: number
  userId?: string
  companyId?: string
  status?: string[]
  plan?: string[]
}

export function useSubscriptions(options: UseSubscriptionsOptions = {}) {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlanDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [lastVisible, setLastVisible] = useState<any>(null)

  const fetchSubscriptions = async (reset = false) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      let q = query(collection(db, "subscriptions"))

      if (options.userId) {
        q = query(q, where("userId", "==", options.userId))
      }

      if (options.companyId) {
        q = query(q, where("companyId", "==", options.companyId))
      }

      if (options.status?.length) {
        q = query(q, where("status", "in", options.status))
      }

      if (options.plan?.length) {
        q = query(q, where("plan", "in", options.plan))
      }

      q = query(q, orderBy("createdAt", "desc"), limit(options.limit || 10))

      if (!reset && lastVisible) {
        q = query(q, startAfter(lastVisible))
      }

      const snapshot = await getDocs(q)
      const newSubscriptions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate?.toDate(),
        endDate: doc.data().endDate?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as SubscriptionPlanDetails[]

      setSubscriptions((prev) =>
        reset ? newSubscriptions : [...prev, ...newSubscriptions]
      )
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === (options.limit || 10))
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptions(true)
  }, [options.status, options.plan])

  const createSubscription = async (
    subscription: Omit<
      SubscriptionPlanDetails,
      "id" | "createdAt" | "updatedAt"
    >
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const docRef = await addDoc(collection(db, "subscriptions"), {
        ...subscription,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return docRef.id
    } catch (err) {
      throw err
    }
  }

  const updateSubscription = async (
    id: string,
    subscription: Partial<SubscriptionPlanDetails>
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const subscriptionRef = doc(db, "subscriptions", id)
      await updateDoc(subscriptionRef, {
        ...subscription,
        updatedAt: new Date(),
      })
    } catch (err) {
      throw err
    }
  }

  const deleteSubscription = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const subscriptionRef = doc(db, "subscriptions", id)
      await deleteDoc(subscriptionRef)
    } catch (err) {
      throw err
    }
  }

  return {
    subscriptions,
    loading,
    error,
    hasMore,
    fetchMore: () => fetchSubscriptions(false),
    createSubscription,
    updateSubscription,
    deleteSubscription,
  }
} 