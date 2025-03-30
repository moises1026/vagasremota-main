import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card"

describe("Card", () => {
  it("renders Card with default props", () => {
    render(<Card>Card content</Card>)
    const card = screen.getByText("Card content")
    expect(card).toHaveClass(
      "rounded-xl",
      "border",
      "bg-card",
      "text-card-foreground",
      "shadow"
    )
  })

  it("renders Card with custom className", () => {
    render(<Card className="custom-class">Card content</Card>)
    const card = screen.getByText("Card content")
    expect(card).toHaveClass("custom-class")
  })

  it("renders CardHeader with default props", () => {
    render(<CardHeader>Header content</CardHeader>)
    const header = screen.getByText("Header content")
    expect(header).toHaveClass("flex", "flex-col", "space-y-1.5", "p-6")
  })

  it("renders CardHeader with custom className", () => {
    render(<CardHeader className="custom-class">Header content</CardHeader>)
    const header = screen.getByText("Header content")
    expect(header).toHaveClass("custom-class")
  })

  it("renders CardTitle with default props", () => {
    render(<CardTitle>Title content</CardTitle>)
    const title = screen.getByText("Title content")
    expect(title).toHaveClass("font-semibold", "leading-none", "tracking-tight")
  })

  it("renders CardTitle with custom className", () => {
    render(<CardTitle className="custom-class">Title content</CardTitle>)
    const title = screen.getByText("Title content")
    expect(title).toHaveClass("custom-class")
  })

  it("renders CardDescription with default props", () => {
    render(<CardDescription>Description content</CardDescription>)
    const description = screen.getByText("Description content")
    expect(description).toHaveClass("text-sm", "text-muted-foreground")
  })

  it("renders CardDescription with custom className", () => {
    render(<CardDescription className="custom-class">Description content</CardDescription>)
    const description = screen.getByText("Description content")
    expect(description).toHaveClass("custom-class")
  })

  it("renders CardContent with default props", () => {
    render(<CardContent>Content</CardContent>)
    const content = screen.getByText("Content")
    expect(content).toHaveClass("p-6", "pt-0")
  })

  it("renders CardContent with custom className", () => {
    render(<CardContent className="custom-class">Content</CardContent>)
    const content = screen.getByText("Content")
    expect(content).toHaveClass("custom-class")
  })

  it("renders CardFooter with default props", () => {
    render(<CardFooter>Footer content</CardFooter>)
    const footer = screen.getByText("Footer content")
    expect(footer).toHaveClass("flex", "items-center", "p-6", "pt-0")
  })

  it("renders CardFooter with custom className", () => {
    render(<CardFooter className="custom-class">Footer content</CardFooter>)
    const footer = screen.getByText("Footer content")
    expect(footer).toHaveClass("custom-class")
  })

  it("renders complete card with all components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText("Card Title")).toBeInTheDocument()
    expect(screen.getByText("Card Description")).toBeInTheDocument()
    expect(screen.getByText("Card Content")).toBeInTheDocument()
    expect(screen.getByText("Card Footer")).toBeInTheDocument()
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Card ref={ref}>Card content</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
}) 