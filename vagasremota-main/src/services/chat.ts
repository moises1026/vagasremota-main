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
  doc,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore"
import { Message, ChatRoom } from "@/types/chat"

export class ChatService {
  private static instance: ChatService

  private constructor() {}

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService()
    }
    return ChatService.instance
  }

  public async getChatRooms(userId: string): Promise<ChatRoom[]> {
    try {
      const chatRoomsRef = collection(db, "chatRooms")
      const q = query(
        chatRoomsRef,
        where("participants", "array-contains", userId),
        orderBy("lastMessageTime", "desc")
      )

      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ChatRoom[]
    } catch (error) {
      console.error("Error getting chat rooms:", error)
      throw error
    }
  }

  public async getMessages(
    chatRoomId: string,
    lastMessage?: Message,
    limitCount: number = 50
  ): Promise<Message[]> {
    try {
      const messagesRef = collection(db, "chatRooms", chatRoomId, "messages")
      let q = query(
        messagesRef,
        orderBy("timestamp", "desc"),
        limit(limitCount)
      )

      if (lastMessage) {
        q = query(
          messagesRef,
          orderBy("timestamp", "desc"),
          startAfter(lastMessage.timestamp),
          limit(limitCount)
        )
      }

      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[]
    } catch (error) {
      console.error("Error getting messages:", error)
      throw error
    }
  }

  public subscribeToMessages(
    chatRoomId: string,
    callback: (messages: Message[]) => void
  ): () => void {
    const messagesRef = collection(db, "chatRooms", chatRoomId, "messages")
    const q = query(
      messagesRef,
      orderBy("timestamp", "desc"),
      limit(50)
    )

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[]
      callback(messages)
    })
  }

  public async sendMessage(
    chatRoomId: string,
    senderId: string,
    content: string
  ): Promise<void> {
    try {
      const messagesRef = collection(db, "chatRooms", chatRoomId, "messages")
      const chatRoomRef = doc(db, "chatRooms", chatRoomId)

      const message = {
        content,
        senderId,
        timestamp: serverTimestamp(),
      }

      await addDoc(messagesRef, message)
      await updateDoc(chatRoomRef, {
        lastMessage: content,
        lastMessageTime: serverTimestamp(),
      })
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  }

  public async createChatRoom(
    participants: string[],
    title?: string
  ): Promise<string> {
    try {
      const chatRoomsRef = collection(db, "chatRooms")
      const chatRoom = {
        participants,
        title: title || `Chat ${participants.join(", ")}`,
        lastMessage: "",
        lastMessageTime: serverTimestamp(),
        createdAt: serverTimestamp(),
      }

      const docRef = await addDoc(chatRoomsRef, chatRoom)
      return docRef.id
    } catch (error) {
      console.error("Error creating chat room:", error)
      throw error
    }
  }

  public async markMessagesAsRead(
    chatRoomId: string,
    userId: string
  ): Promise<void> {
    try {
      const messagesRef = collection(db, "chatRooms", chatRoomId, "messages")
      const q = query(
        messagesRef,
        where("senderId", "!=", userId),
        where("read", "==", false)
      )

      const snapshot = await getDocs(q)
      const batch = writeBatch(db)

      snapshot.docs.forEach((doc) => {
        batch.update(doc.ref, { read: true })
      })

      await batch.commit()
    } catch (error) {
      console.error("Error marking messages as read:", error)
      throw error
    }
  }
} 