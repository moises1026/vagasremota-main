import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Label } from "./label"

describe("Label", () => {
  it("renderiza com props padrão", () => {
    render(<Label>Rótulo</Label>)
    const label = screen.getByText("Rótulo")
    expect(label).toHaveClass(
      "text-sm",
      "font-medium",
      "leading-none",
      "peer-disabled:cursor-not-allowed",
      "peer-disabled:opacity-70"
    )
  })

  it("renderiza com className personalizada", () => {
    render(<Label className="classe-personalizada">Rótulo</Label>)
    const label = screen.getByText("Rótulo")
    expect(label).toHaveClass("classe-personalizada")
  })

  it("renderiza com htmlFor", () => {
    render(<Label htmlFor="campo">Rótulo</Label>)
    const label = screen.getByText("Rótulo")
    expect(label).toHaveAttribute("for", "campo")
  })

  it("renderiza com children", () => {
    render(
      <Label>
        <span>Rótulo</span>
        <span>Opcional</span>
      </Label>
    )
    expect(screen.getByText("Rótulo")).toBeInTheDocument()
    expect(screen.getByText("Opcional")).toBeInTheDocument()
  })

  it("encaminha ref corretamente", () => {
    const ref = { current: null }
    render(<Label ref={ref}>Rótulo</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it("renderiza com atributos adicionais", () => {
    render(
      <Label data-testid="teste" aria-label="Rótulo de teste">
        Rótulo
      </Label>
    )
    const label = screen.getByTestId("teste")
    expect(label).toHaveAttribute("aria-label", "Rótulo de teste")
  })
}) 