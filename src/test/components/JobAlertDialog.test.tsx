import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { JobAlertDialog } from '@/components/JobAlertDialog'
import { toast } from 'sonner'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('JobAlertDialog', () => {
  let mockOnSave: any

  beforeEach(() => {
    mockOnSave = vi.fn()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders dialog trigger button correctly', () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    expect(screen.getByRole('button', { name: /create job alert/i })).toBeInTheDocument()
  })

  it('opens dialog when trigger button is clicked', async () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    await waitFor(() => {
      expect(screen.getByText(/set up alerts/i)).toBeInTheDocument()
    })
  })

  it('renders form fields correctly', () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    expect(screen.getByLabelText(/email para receber alertas/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cargo ou palavra-chave/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tipo de contrato/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nível de experiência/i)).toBeInTheDocument()
    expect(screen.getByText(/receber resumo diário/i)).toBeInTheDocument()
  })

  it('validates required fields when submitting empty form', async () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    const submitButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
      expect(screen.getByText(/campo obrigatório/i)).toBeInTheDocument()
      expect(toast.success).not.toHaveBeenCalled()
    })
  })

  it('validates email format', async () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    const emailInput = screen.getByLabelText(/email para receber alertas/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
      expect(toast.success).not.toHaveBeenCalled()
    })
  })

  it('submits form with valid data', async () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/email para receber alertas/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/cargo ou palavra-chave/i), {
      target: { value: 'React Developer' }
    })
    fireEvent.change(screen.getByLabelText(/tipo de contrato/i), {
      target: { value: 'CLT' }
    })
    fireEvent.change(screen.getByLabelText(/nível de experiência/i), {
      target: { value: 'senior' }
    })
    
    const submitButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Alert saved successfully!')
    })
  })

  it('closes dialog after successful submission', async () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/email para receber alertas/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/cargo ou palavra-chave/i), {
      target: { value: 'React Developer' }
    })
    
    const submitButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.queryByText(/set up alerts/i)).not.toBeInTheDocument()
    })
  })

  it('resets form after successful submission', async () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/email para receber alertas/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/cargo ou palavra-chave/i), {
      target: { value: 'React Developer' }
    })
    
    const submitButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(submitButton)
    
    // Reopen dialog
    fireEvent.click(triggerButton)
    
    expect(screen.getByLabelText(/email para receber alertas/i)).toHaveValue('')
    expect(screen.getByLabelText(/cargo ou palavra-chave/i)).toHaveValue('')
  })

  it('toggles daily summary checkbox', () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    const dailySummaryCheckbox = screen.getByText(/receber resumo diário/i)
    fireEvent.click(dailySummaryCheckbox)
    
    expect(dailySummaryCheckbox).toBeChecked()
  })

  it('closes the dialog when cancel button is clicked', async () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    // Open dialog
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Find and click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancelar/i })
    fireEvent.click(cancelButton)
    
    // Check if dialog is closed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('calls onSave with form data when save is clicked', async () => {
    renderWithRouter(<JobAlertDialog onSave={mockOnSave} />)
    
    // Open dialog
    const triggerButton = screen.getByRole('button', { name: /create job alert/i })
    fireEvent.click(triggerButton)
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Fill form with valid data
    const nameInput = screen.getByLabelText(/nome do alerta/i)
    fireEvent.change(nameInput, { target: { value: 'Test Alert' } })
    
    // Click save
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    // Expect onSave to be called with the form data
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled()
      expect(toast.success).toHaveBeenCalledWith('Alert saved successfully!')
    })
  })
}) 