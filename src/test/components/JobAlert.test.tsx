import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { JobAlert } from '@/components/jobs/JobAlert'
import { useLanguage } from '@/hooks/useLanguage'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock useLanguage hook
vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: vi.fn()
}))

const mockTranslations = {
  t: (key: string) => {
    const translations: { [key: string]: string } = {
      'jobs.alerts.name': 'Nome do Alerta',
      'jobs.alerts.frequency': 'Frequência',
      'jobs.alerts.daily': 'Diário',
      'jobs.alerts.weekly': 'Semanal',
      'jobs.alerts.realtime': 'Tempo Real',
      'jobs.alerts.notifications': 'Notificações',
      'jobs.alerts.email': 'Email',
      'jobs.alerts.push': 'Push',
      'common.cancel': 'Cancelar',
      'common.save': 'Salvar'
    }
    return translations[key] || key
  }
}

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('JobAlert', () => {
  beforeEach(() => {
    ;(useLanguage as any).mockReturnValue(mockTranslations)
  })

  it('renders alert form correctly', () => {
    renderWithRouter(<JobAlert onSave={vi.fn()} onCancel={vi.fn()} />)
    
    expect(screen.getByLabelText(/nome do alerta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/frequência/i)).toBeInTheDocument()
    expect(screen.getByText(/notificações/i)).toBeInTheDocument()
    expect(screen.getByText(/email/i)).toBeInTheDocument()
    expect(screen.getByText(/push/i)).toBeInTheDocument()
  })

  it('pre-fills form with initial data when provided', () => {
    const initialData = {
      id: '1',
      userId: 'user1',
      name: 'React Developer Alert',
      filters: {
        types: ['remote'],
        levels: ['senior'],
        skills: ['React', 'TypeScript'],
        salary: {
          min: 5000,
          max: 15000
        },
        location: 'São Paulo',
        remote: true,
        hybrid: false,
        onsite: false,
        keywords: 'React Developer'
      },
      emailNotifications: true,
      pushNotifications: false,
      frequency: 'daily',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    }

    renderWithRouter(<JobAlert onSave={vi.fn()} onCancel={vi.fn()} initialData={initialData} />)
    
    expect(screen.getByLabelText(/nome do alerta/i)).toHaveValue('React Developer Alert')
    expect(screen.getByLabelText(/frequência/i)).toHaveValue('daily')
    expect(screen.getByText(/email/i)).toBeChecked()
    expect(screen.getByText(/push/i)).not.toBeChecked()
  })

  it('updates alert name when typing', () => {
    renderWithRouter(<JobAlert onSave={vi.fn()} onCancel={vi.fn()} />)
    
    const nameInput = screen.getByLabelText(/nome do alerta/i)
    fireEvent.change(nameInput, { target: { value: 'New Alert Name' } })
    
    expect(nameInput).toHaveValue('New Alert Name')
  })

  it('updates frequency when selecting', () => {
    renderWithRouter(<JobAlert onSave={vi.fn()} onCancel={vi.fn()} />)
    
    const frequencySelect = screen.getByLabelText(/frequência/i)
    fireEvent.change(frequencySelect, { target: { value: 'weekly' } })
    
    expect(frequencySelect).toHaveValue('weekly')
  })

  it('toggles email notifications', () => {
    renderWithRouter(<JobAlert onSave={vi.fn()} onCancel={vi.fn()} />)
    
    const emailCheckbox = screen.getByText(/email/i)
    fireEvent.click(emailCheckbox)
    
    expect(emailCheckbox).toBeChecked()
  })

  it('toggles push notifications', () => {
    renderWithRouter(<JobAlert onSave={vi.fn()} onCancel={vi.fn()} />)
    
    const pushCheckbox = screen.getByText(/push/i)
    fireEvent.click(pushCheckbox)
    
    expect(pushCheckbox).toBeChecked()
  })

  it('calls onSave with alert data when save button is clicked', async () => {
    const onSave = vi.fn()
    renderWithRouter(<JobAlert onSave={onSave} onCancel={vi.fn()} />)
    
    // Fill in form
    fireEvent.change(screen.getByLabelText(/nome do alerta/i), {
      target: { value: 'New Alert' }
    })
    fireEvent.change(screen.getByLabelText(/frequência/i), {
      target: { value: 'weekly' }
    })
    fireEvent.click(screen.getByText(/email/i))
    fireEvent.click(screen.getByText(/push/i))
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({
        id: '',
        userId: '',
        name: 'New Alert',
        filters: {
          types: [],
          levels: [],
          skills: [],
          salary: {
            min: 0,
            max: 50000
          },
          location: '',
          remote: false,
          hybrid: false,
          onsite: false,
          keywords: ''
        },
        emailNotifications: true,
        pushNotifications: true,
        frequency: 'weekly',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        isActive: true
      })
    })
  })

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = vi.fn()
    renderWithRouter(<JobAlert onSave={vi.fn()} onCancel={onCancel} />)
    
    const cancelButton = screen.getByRole('button', { name: /cancelar/i })
    fireEvent.click(cancelButton)
    
    expect(onCancel).toHaveBeenCalled()
  })

  it('validates required fields when saving', async () => {
    const onSave = vi.fn()
    renderWithRouter(<JobAlert onSave={onSave} onCancel={vi.fn()} />)
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText(/nome do alerta é obrigatório/i)).toBeInTheDocument()
      expect(onSave).not.toHaveBeenCalled()
    })
  })
}) 