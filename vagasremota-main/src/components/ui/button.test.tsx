import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Button } from "./button"

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("bg-primary", "text-primary-foreground", "h-9", "px-4", "py-2")
  })

  it("renders with different variants", () => {
    const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const

    variants.forEach((variant) => {
      const { rerender } = render(<Button variant={variant}>Button</Button>)
      const button = screen.getByRole("button")

      switch (variant) {
        case "default":
          expect(button).toHaveClass("bg-primary", "text-primary-foreground")
          break
        case "destructive":
          expect(button).toHaveClass("bg-destructive", "text-destructive-foreground")
          break
        case "outline":
          expect(button).toHaveClass("border", "bg-background")
          break
        case "secondary":
          expect(button).toHaveClass("bg-secondary", "text-secondary-foreground")
          break
        case "ghost":
          expect(button).toHaveClass("hover:bg-accent", "hover:text-accent-foreground")
          break
        case "link":
          expect(button).toHaveClass("text-primary", "underline-offset-4")
          break
      }

      rerender(<></>)
    })
  })

  it("renders with different sizes", () => {
    const sizes = ["default", "sm", "lg", "icon"] as const

    sizes.forEach((size) => {
      const { rerender } = render(<Button size={size}>Button</Button>)
      const button = screen.getByRole("button")

      switch (size) {
        case "default":
          expect(button).toHaveClass("h-9", "px-4", "py-2")
          break
        case "sm":
          expect(button).toHaveClass("h-8", "px-3", "text-xs")
          break
        case "lg":
          expect(button).toHaveClass("h-10", "px-8")
          break
        case "icon":
          expect(button).toHaveClass("h-9", "w-9")
          break
      }

      rerender(<></>)
    })
  })

  it("renders as a child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/">Link</a>
      </Button>
    )
    const link = screen.getByRole("link")
    expect(link).toHaveClass("inline-flex", "items-center", "justify-center")
  })

  it("applies custom className", () => {
    render(<Button className="custom-class">Button</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-class")
  })

  it("handles disabled state", () => {
    render(<Button disabled>Button</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Button ref={ref}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("handles click events", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Button</Button>)
    const button = screen.getByRole("button")
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
}) 