import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Mock AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn()
}))

// Mock Firestore
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn()
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false
  }))
})

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('initializes with light theme by default', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    })

    expect(result.current.theme).toBe('light')
    expect(document.documentElement).toHaveClass('light')
  })

  it('loads theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    })

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('toggles theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    })

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('updates theme in database when user is logged in', () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'candidato',
      createdAt: new Date()
    }

    ;(useAuth as jest.Mock).mockReturnValue({ user: mockUser })

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    })

    act(() => {
      result.current.toggleTheme()
    })

    expect(updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      { theme: 'dark' }
    )
  })

  it('detects system theme preference', () => {
    // Mock system dark mode preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)'
      }))
    })

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    })

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('responds to system theme changes', () => {
    const mockMatchMedia = jest.fn()
    const mockListener = jest.fn()
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        addEventListener: mockListener,
        removeEventListener: jest.fn()
      }))
    })

    renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    })

    expect(mockListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
}) 