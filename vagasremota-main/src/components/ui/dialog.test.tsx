import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog"

describe("Dialog", () => {
  it("renders DialogTrigger with default props", () => {
    render(<DialogTrigger>Open Dialog</DialogTrigger>)
    const trigger = screen.getByText("Open Dialog")
    expect(trigger).toBeInTheDocument()
  })

  it("renders DialogContent with default props", () => {
    render(
      <Dialog>
        <DialogContent>Dialog content</DialogContent>
      </Dialog>
    )
    const content = screen.getByText("Dialog content")
    expect(content).toHaveClass(
      "fixed",
      "left-[50%]",
      "top-[50%]",
      "z-50",
      "grid",
      "w-full",
      "max-w-lg",
      "translate-x-[-50%]",
      "translate-y-[-50%]",
      "gap-4",
      "border",
      "bg-background",
      "p-6",
      "shadow-lg"
    )
  })

  it("renders DialogContent with custom className", () => {
    render(
      <Dialog>
        <DialogContent className="custom-class">Dialog content</DialogContent>
      </Dialog>
    )
    const content = screen.getByText("Dialog content")
    expect(content).toHaveClass("custom-class")
  })

  it("renders DialogHeader with default props", () => {
    render(<DialogHeader>Header content</DialogHeader>)
    const header = screen.getByText("Header content")
    expect(header).toHaveClass("flex", "flex-col", "space-y-1.5", "text-center", "sm:text-left")
  })

  it("renders DialogHeader with custom className", () => {
    render(<DialogHeader className="custom-class">Header content</DialogHeader>)
    const header = screen.getByText("Header content")
    expect(header).toHaveClass("custom-class")
  })

  it("renders DialogTitle with default props", () => {
    render(<DialogTitle>Dialog Title</DialogTitle>)
    const title = screen.getByText("Dialog Title")
    expect(title).toHaveClass("text-lg", "font-semibold", "leading-none", "tracking-tight")
  })

  it("renders DialogTitle with custom className", () => {
    render(<DialogTitle className="custom-class">Dialog Title</DialogTitle>)
    const title = screen.getByText("Dialog Title")
    expect(title).toHaveClass("custom-class")
  })

  it("renders DialogDescription with default props", () => {
    render(<DialogDescription>Dialog Description</DialogDescription>)
    const description = screen.getByText("Dialog Description")
    expect(description).toHaveClass("text-sm", "text-muted-foreground")
  })

  it("renders DialogDescription with custom className", () => {
    render(<DialogDescription className="custom-class">Dialog Description</DialogDescription>)
    const description = screen.getByText("Dialog Description")
    expect(description).toHaveClass("custom-class")
  })

  it("renders DialogFooter with default props", () => {
    render(<DialogFooter>Footer content</DialogFooter>)
    const footer = screen.getByText("Footer content")
    expect(footer).toHaveClass(
      "flex",
      "flex-col-reverse",
      "sm:flex-row",
      "sm:justify-end",
      "sm:space-x-2"
    )
  })

  it("renders DialogFooter with custom className", () => {
    render(<DialogFooter className="custom-class">Footer content</DialogFooter>)
    const footer = screen.getByText("Footer content")
    expect(footer).toHaveClass("custom-class")
  })

  it("renders DialogClose button", () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    )
    const closeButton = screen.getByRole("button")
    expect(closeButton).toHaveClass(
      "absolute",
      "right-4",
      "top-4",
      "rounded-sm",
      "opacity-70",
      "ring-offset-background",
      "transition-opacity",
      "hover:opacity-100",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-ring",
      "focus:ring-offset-2",
      "disabled:pointer-events-none"
    )
  })

  it("renders complete dialog with all components", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByText("Open Dialog")).toBeInTheDocument()
    expect(screen.getByText("Dialog Title")).toBeInTheDocument()
    expect(screen.getByText("Dialog Description")).toBeInTheDocument()
    expect(screen.getByText("Dialog Content")).toBeInTheDocument()
    expect(screen.getByText("Close")).toBeInTheDocument()
  })

  it("handles dialog open/close state", () => {
    const onOpenChange = vi.fn()
    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Dialog content</DialogContent>
      </Dialog>
    )

    const trigger = screen.getByText("Open Dialog")
    fireEvent.click(trigger)
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })
}) 