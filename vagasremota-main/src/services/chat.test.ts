import { describe, it, expect, vi, beforeEach } from "vitest"
import { db } from "@/lib/firebase"
import {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessage,
  getMessages,
  subscribeToMessages,
} from "./chat"

describe("Chat Service", () => {
  const mockMessage = {
    id: "123",
    senderId: "456",
    receiverId: "789",
    content: "Hello!",
    read: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const mockMessages = [mockMessage]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("creates a message successfully", async () => {
    const result = await createMessage(mockMessage)
    expect(result).toEqual(mockMessage)
  })

  it("updates a message successfully", async () => {
    const updatedMessage = { ...mockMessage, read: true }
    const result = await updateMessage(mockMessage.id, updatedMessage)
    expect(result).toEqual(updatedMessage)
  })

  it("deletes a message successfully", async () => {
    await deleteMessage(mockMessage.id)
    const result = await getMessage(mockMessage.id)
    expect(result).toBeNull()
  })

  it("gets a message successfully", async () => {
    const result = await getMessage(mockMessage.id)
    expect(result).toEqual(mockMessage)
  })

  it("gets messages between two users", async () => {
    const result = await getMessages(mockMessage.senderId, mockMessage.receiverId)
    expect(result).toEqual(mockMessages)
  })

  it("subscribes to messages between two users", async () => {
    const callback = vi.fn()
    const unsubscribe = await subscribeToMessages(
      mockMessage.senderId,
      mockMessage.receiverId,
      callback
    )

    expect(callback).toHaveBeenCalledWith(mockMessages)
    expect(unsubscribe).toBeDefined()
  })

  it("handles message creation error", async () => {
    const mockError = new Error("Failed to create message")
    vi.mock("firebase/firestore", () => ({
      addDoc: vi.fn().mockRejectedValue(mockError),
    }))

    await expect(createMessage(mockMessage)).rejects.toThrow(mockError)
  })

  it("handles message update error", async () => {
    const mockError = new Error("Failed to update message")
    vi.mock("firebase/firestore", () => ({
      updateDoc: vi.fn().mockRejectedValue(mockError),
    }))

    await expect(updateMessage(mockMessage.id, mockMessage)).rejects.toThrow(mockError)
  })

  it("handles message deletion error", async () => {
    const mockError = new Error("Failed to delete message")
    vi.mock("firebase/firestore", () => ({
      deleteDoc: vi.fn().mockRejectedValue(mockError),
    }))

    await expect(deleteMessage(mockMessage.id)).rejects.toThrow(mockError)
  })

  it("handles message retrieval error", async () => {
    const mockError = new Error("Failed to get message")
    vi.mock("firebase/firestore", () => ({
      getDoc: vi.fn().mockRejectedValue(mockError),
    }))

    await expect(getMessage(mockMessage.id)).rejects.toThrow(mockError)
  })

  it("handles messages retrieval error", async () => {
    const mockError = new Error("Failed to get messages")
    vi.mock("firebase/firestore", () => ({
      getDocs: vi.fn().mockRejectedValue(mockError),
    }))

    await expect(getMessages(mockMessage.senderId, mockMessage.receiverId)).rejects.toThrow(mockError)
  })

  it("handles message subscription error", async () => {
    const mockError = new Error("Failed to subscribe to messages")
    vi.mock("firebase/firestore", () => ({
      onSnapshot: vi.fn().mockRejectedValue(mockError),
    }))

    await expect(
      subscribeToMessages(mockMessage.senderId, mockMessage.receiverId, vi.fn())
    ).rejects.toThrow(mockError)
  })
}) 