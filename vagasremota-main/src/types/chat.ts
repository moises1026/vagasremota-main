import { Timestamp } from "firebase/firestore"

export interface Message {
  id: string
  content: string
  senderId: string
  timestamp: Timestamp
  read: boolean
}

export interface ChatRoom {
  id: string
  participants: string[]
  title: string
  lastMessage: string
  lastMessageTime: Timestamp
  createdAt: Timestamp
} 