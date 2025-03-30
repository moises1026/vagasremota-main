import { renderHook } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useToast } from "./useToast"
import toast from "react-hot-toast"

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}))

describe("useToast", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("provides toast functions", () => {
    const { result } = renderHook(() => useToast())

    expect(result.current.showToast).toBeDefined()
    expect(result.current.dismissToast).toBeDefined()
    expect(result.current.dismissAllToasts).toBeDefined()
  })

  it("shows success toast with default options", () => {
    const { result } = renderHook(() => useToast())
    const message = "Operation successful"

    result.current.showToast(message, "success")

    expect(vi.mocked(toast.success)).toHaveBeenCalledWith(message, {
      duration: 3000,
      position: "top-right",
      style: undefined,
      className: undefined,
      icon: "✅",
    })
  })

  it("shows error toast with custom options", () => {
    const { result } = renderHook(() => useToast())
    const message = "Operation failed"
    const options = {
      duration: 5000,
      position: "bottom-center",
      icon: "⚠️",
      style: { backgroundColor: "red" },
      className: "custom-toast",
    }

    result.current.showToast(message, "error", options)

    expect(vi.mocked(toast.error)).toHaveBeenCalledWith(message, {
      ...options,
      icon: "⚠️",
    })
  })

  it("shows loading toast", () => {
    const { result } = renderHook(() => useToast())
    const message = "Loading..."

    result.current.showToast(message, "loading")

    expect(vi.mocked(toast.loading)).toHaveBeenCalledWith(message, {
      duration: 3000,
      position: "top-right",
      style: undefined,
      className: undefined,
      icon: "⏳",
    })
  })

  it("shows info toast", () => {
    const { result } = renderHook(() => useToast())
    const message = "Information message"

    result.current.showToast(message, "info")

    expect(vi.mocked(toast)).toHaveBeenCalledWith(message, {
      duration: 3000,
      position: "top-right",
      style: undefined,
      className: undefined,
      icon: "ℹ️",
    })
  })

  it("dismisses specific toast", () => {
    const { result } = renderHook(() => useToast())
    const toastId = "toast-123"

    result.current.dismissToast(toastId)

    expect(vi.mocked(toast.dismiss)).toHaveBeenCalledWith(toastId)
  })

  it("dismisses all toasts", () => {
    const { result } = renderHook(() => useToast())

    result.current.dismissAllToasts()

    expect(vi.mocked(toast.dismiss)).toHaveBeenCalledWith()
  })
}) 