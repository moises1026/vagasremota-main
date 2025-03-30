import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn()
}))

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn()
}))

describe('AuthContext', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'candidato',
    createdAt: new Date()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('registers a new user with email and password', async () => {
    ;(createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: '1', email: 'test@example.com' }
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(async () => {
      await result.current.registerWithEmail(
        'Test User',
        'test@example.com',
        'password123',
        'candidato'
      )
    })

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'test@example.com',
      'password123'
    )
    expect(setDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        name: 'Test User',
        email: 'test@example.com',
        role: 'candidato'
      })
    )
  })

  it('signs in with email and password', async () => {
    ;(signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: '1', email: 'test@example.com' }
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(async () => {
      await result.current.signInWithEmail('test@example.com', 'password123')
    })

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'test@example.com',
      'password123'
    )
  })

  it('signs out the user', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(async () => {
      await result.current.logout()
    })

    expect(signOut).toHaveBeenCalledWith(auth)
  })

  it('handles authentication errors', async () => {
    const error = new Error('Invalid email/password')
    ;(signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error)

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(async () => {
      await result.current.signInWithEmail('test@example.com', 'wrongpassword')
    })

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'test@example.com',
      'wrongpassword'
    )
  })
}) 