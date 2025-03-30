import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Input } from "./input"

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveClass(
      "flex",
      "h-9",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-transparent",
      "px-3",
      "py-1",
      "text-sm",
      "shadow-sm"
    )
  })

  it("renders with different types", () => {
    const types = ["text", "email", "password", "number", "tel"] as const

    types.forEach((type) => {
      const { rerender } = render(<Input type={type} />)
      const input = screen.getByRole(type === "number" ? "spinbutton" : "textbox")
      expect(input).toHaveAttribute("type", type)
      rerender(<></>)
    })
  })

  it("renders with placeholder", () => {
    const placeholder = "Enter text..."
    render(<Input placeholder={placeholder} />)
    const input = screen.getByPlaceholderText(placeholder)
    expect(input).toBeInTheDocument()
  })

  it("handles value changes", () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole("textbox")
    input.value = "test"
    input.dispatchEvent(new Event("change"))
    expect(handleChange).toHaveBeenCalled()
  })

  it("handles disabled state", () => {
    render(<Input disabled />)
    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
    expect(input).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50")
  })

  it("applies custom className", () => {
    render(<Input className="custom-class" />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("handles focus and blur events", () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
    const input = screen.getByRole("textbox")

    input.focus()
    expect(handleFocus).toHaveBeenCalledTimes(1)

    input.blur()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it("handles keyboard events", () => {
    const handleKeyDown = vi.fn()
    const handleKeyUp = vi.fn()
    render(<Input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />)
    const input = screen.getByRole("textbox")

    input.dispatchEvent(new KeyboardEvent("keydown"))
    expect(handleKeyDown).toHaveBeenCalledTimes(1)

    input.dispatchEvent(new KeyboardEvent("keyup"))
    expect(handleKeyUp).toHaveBeenCalledTimes(1)
  })
}) 