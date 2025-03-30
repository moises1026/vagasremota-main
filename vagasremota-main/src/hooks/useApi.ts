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
import { ApiKey, ApiWebhook, ApiRateLimit } from "@/types/api"

interface UseApiOptions {
  limit?: number
  companyId?: string
  isActive?: boolean
}

export function useApi(options: UseApiOptions = {}) {
  const { user } = useAuth()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [webhooks, setWebhooks] = useState<ApiWebhook[]>([])
  const [rateLimit, setRateLimit] = useState<ApiRateLimit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [lastVisible, setLastVisible] = useState<any>(null)

  const fetchApiKeys = async (reset = false) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      let q = query(collection(db, "apiKeys"))

      if (options.companyId) {
        q = query(q, where("companyId", "==", options.companyId))
      }

      if (options.isActive !== undefined) {
        q = query(q, where("isActive", "==", options.isActive))
      }

      q = query(q, orderBy("createdAt", "desc"), limit(options.limit || 10))

      if (!reset && lastVisible) {
        q = query(q, startAfter(lastVisible))
      }

      const snapshot = await getDocs(q)
      const newApiKeys = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastUsed: doc.data().lastUsed?.toDate(),
      })) as ApiKey[]

      setApiKeys((prev) => (reset ? newApiKeys : [...prev, ...newApiKeys]))
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === (options.limit || 10))
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  const fetchWebhooks = async (reset = false) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      let q = query(collection(db, "webhooks"))

      if (options.companyId) {
        q = query(q, where("companyId", "==", options.companyId))
      }

      if (options.isActive !== undefined) {
        q = query(q, where("isActive", "==", options.isActive))
      }

      q = query(q, orderBy("createdAt", "desc"), limit(options.limit || 10))

      if (!reset && lastVisible) {
        q = query(q, startAfter(lastVisible))
      }

      const snapshot = await getDocs(q)
      const newWebhooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastTriggered: doc.data().lastTriggered?.toDate(),
      })) as ApiWebhook[]

      setWebhooks((prev) => (reset ? newWebhooks : [...prev, ...newWebhooks]))
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === (options.limit || 10))
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRateLimit = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const q = query(
        collection(db, "rateLimits"),
        where("companyId", "==", options.companyId),
        limit(1)
      )

      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        setRateLimit({
          id: doc.id,
          ...doc.data(),
        } as ApiRateLimit)
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApiKeys(true)
    fetchWebhooks(true)
    fetchRateLimit()
  }, [options.isActive])

  const createApiKey = async (apiKey: Omit<ApiKey, "id" | "createdAt">) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const docRef = await addDoc(collection(db, "apiKeys"), {
        ...apiKey,
        createdAt: new Date(),
      })

      return docRef.id
    } catch (err) {
      throw err
    }
  }

  const updateApiKey = async (id: string, apiKey: Partial<ApiKey>) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const apiKeyRef = doc(db, "apiKeys", id)
      await updateDoc(apiKeyRef, apiKey)
    } catch (err) {
      throw err
    }
  }

  const deleteApiKey = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const apiKeyRef = doc(db, "apiKeys", id)
      await deleteDoc(apiKeyRef)
    } catch (err) {
      throw err
    }
  }

  const createWebhook = async (
    webhook: Omit<ApiWebhook, "id" | "createdAt">
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const docRef = await addDoc(collection(db, "webhooks"), {
        ...webhook,
        createdAt: new Date(),
      })

      return docRef.id
    } catch (err) {
      throw err
    }
  }

  const updateWebhook = async (
    id: string,
    webhook: Partial<ApiWebhook>
  ) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const webhookRef = doc(db, "webhooks", id)
      await updateDoc(webhookRef, webhook)
    } catch (err) {
      throw err
    }
  }

  const deleteWebhook = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const webhookRef = doc(db, "webhooks", id)
      await deleteDoc(webhookRef)
    } catch (err) {
      throw err
    }
  }

  return {
    apiKeys,
    webhooks,
    rateLimit,
    loading,
    error,
    hasMore,
    fetchMore: () => {
      fetchApiKeys(false)
      fetchWebhooks(false)
    },
    createApiKey,
    updateApiKey,
    deleteApiKey,
    createWebhook,
    updateWebhook,
    deleteWebhook,
  }
} 