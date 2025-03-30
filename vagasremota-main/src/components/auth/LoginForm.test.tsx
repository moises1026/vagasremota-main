import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import LoginForm from "./LoginForm"

describe("LoginForm", () => {
  const renderLoginForm = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    )
  }

  it("renders login form correctly", () => {
    renderLoginForm()

    expect(screen.getByText("Entrar")).toBeInTheDocument()
    expect(screen.getByText("Criar conta")).toBeInTheDocument()
    expect(screen.getByText("Continuar com Google")).toBeInTheDocument()
  })

  it("shows validation errors for invalid email", async () => {
    renderLoginForm()

    const emailInput = screen.getByLabelText("Email")
    const submitButton = screen.getByRole("button", { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: "invalid-email" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Email inválido")).toBeInTheDocument()
    })
  })

  it("shows validation errors for invalid password", async () => {
    renderLoginForm()

    const passwordInput = screen.getByLabelText("Senha")
    const submitButton = screen.getByRole("button", { name: /entrar/i })

    fireEvent.change(passwordInput, { target: { value: "123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Senha deve ter no mínimo 6 caracteres")).toBeInTheDocument()
    })
  })

  it("handles form submission correctly", async () => {
    renderLoginForm()

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Senha")
    const submitButton = screen.getByRole("button", { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText("Email inválido")).not.toBeInTheDocument()
      expect(screen.queryByText("Senha deve ter no mínimo 6 caracteres")).not.toBeInTheDocument()
    })
  })

  it("handles Google sign in", async () => {
    renderLoginForm()

    const googleButton = screen.getByRole("button", { name: /continuar com google/i })
    fireEvent.click(googleButton)

    await waitFor(() => {
      // Add assertions for Google sign in behavior
    })
  })

  it("navigates to registration page when clicking create account", () => {
    renderLoginForm()

    const createAccountLink = screen.getByText("Criar conta")
    fireEvent.click(createAccountLink)

    // Add assertions for navigation
  })
}) 