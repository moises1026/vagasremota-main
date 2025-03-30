import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { AuthProvider } from "@/contexts/AuthContext"
import { useAuth } from "./useAuth"

describe("useAuth", () => {
  const mockUser = {
    uid: "123",
    email: "test@example.com",
    displayName: "Test User",
    photoURL: "https://example.com/photo.jpg",
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("provides initial state correctly", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it("handles Google sign in successfully", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await act(async () => {
      await result.current.signInWithGoogle()
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.error).toBeNull()
  })

  it("handles Google sign in error", async () => {
    const mockError = new Error("Failed to sign in")
    vi.mock("firebase/auth", () => ({
      signInWithPopup: vi.fn().mockRejectedValue(mockError),
    }))

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await act(async () => {
      await result.current.signInWithGoogle()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.error).toBe(mockError.message)
  })

  it("handles sign out successfully", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await act(async () => {
      await result.current.signOut()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it("handles sign out error", async () => {
    const mockError = new Error("Failed to sign out")
    vi.mock("firebase/auth", () => ({
      signOut: vi.fn().mockRejectedValue(mockError),
    }))

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await act(async () => {
      await result.current.signOut()
    })

    expect(result.current.error).toBe(mockError.message)
  })

  it("updates user state when auth state changes", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await act(async () => {
      // Simulate auth state change
      const authStateCallback = vi.fn().mockImplementation((callback) => {
        callback(mockUser)
      })
      vi.mock("firebase/auth", () => ({
        onAuthStateChanged: authStateCallback,
      }))
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.loading).toBe(false)
  })
}) 