import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./useAuth"
import { db } from "@/lib/firebase"
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore"

interface Notification {
  id: string
  userId: string
  type: "job" | "application" | "interview" | "system"
  title: string
  message: string
  read: boolean
  createdAt: Date
  data?: any
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(
  undefined
)

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(50)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Notification[]

      setNotifications(notifications)
      setUnreadCount(notifications.filter((n) => !n.read).length)
    })

    return unsubscribe
  }, [user])

  const markAsRead = async (id: string) => {
    if (!user) return

    const notificationRef = collection(db, "notifications")
    await notificationRef.doc(id).update({
      read: true,
    })
  }

  const markAllAsRead = async () => {
    if (!user) return

    const batch = db.batch()
    const unreadNotifications = notifications.filter((n) => !n.read)

    unreadNotifications.forEach((notification) => {
      const notificationRef = collection(db, "notifications").doc(
        notification.id
      )
      batch.update(notificationRef, { read: true })
    })

    await batch.commit()
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    )
  }
  return context
} 