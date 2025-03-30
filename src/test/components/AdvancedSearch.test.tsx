import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AdvancedSearch } from '@/components/jobs/AdvancedSearch'
import { useLanguage } from '@/hooks/useLanguage'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock useLanguage hook
vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: vi.fn()
}))

const mockTranslations = {
  t: (key: string) => {
    const translations: { [key: string]: string } = {
      'jobs.search.filters': 'Filtros',
      'jobs.search.keywords': 'Palavras-chave',
      'jobs.type': 'Tipo',
      'jobs.remote': 'Remoto',
      'jobs.hybrid': 'Híbrido',
      'jobs.onsite': 'Presencial',
      'jobs.level': 'Nível',
      'jobs.junior': 'Júnior',
      'jobs.midLevel': 'Pleno',
      'jobs.senior': 'Sênior',
      'jobs.lead': 'Lead',
      'jobs.manager': 'Gerente',
      'jobs.director': 'Diretor',
      'jobs.salary': 'Salário',
      'jobs.location': 'Localização',
      'common.reset': 'Limpar',
      'jobs.search.saveSearch': 'Salvar Busca',
      'jobs.search.createAlert': 'Criar Alerta',
      'common.search': 'Buscar'
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

describe('AdvancedSearch', () => {
  beforeEach(() => {
    ;(useLanguage as any).mockReturnValue(mockTranslations)
  })

  it('renders search form correctly', () => {
    renderWithRouter(<AdvancedSearch onSearch={vi.fn()} />)
    
    expect(screen.getByPlaceholderText(/palavras-chave/i)).toBeInTheDocument()
    expect(screen.getByText(/tipo/i)).toBeInTheDocument()
    expect(screen.getByText(/nível/i)).toBeInTheDocument()
    expect(screen.getByText(/salário/i)).toBeInTheDocument()
    expect(screen.getByText(/localização/i)).toBeInTheDocument()
  })

  it('updates keywords when typing', () => {
    renderWithRouter(<AdvancedSearch onSearch={vi.fn()} />)
    
    const keywordsInput = screen.getByPlaceholderText(/palavras-chave/i)
    fireEvent.change(keywordsInput, { target: { value: 'React Developer' } })
    
    expect(keywordsInput).toHaveValue('React Developer')
  })

  it('toggles job type checkboxes', () => {
    renderWithRouter(<AdvancedSearch onSearch={vi.fn()} />)
    
    const remoteCheckbox = screen.getByText(/remoto/i)
    const hybridCheckbox = screen.getByText(/híbrido/i)
    const onsiteCheckbox = screen.getByText(/presencial/i)
    
    fireEvent.click(remoteCheckbox)
    fireEvent.click(hybridCheckbox)
    fireEvent.click(onsiteCheckbox)
    
    expect(remoteCheckbox).toBeChecked()
    expect(hybridCheckbox).toBeChecked()
    expect(onsiteCheckbox).toBeChecked()
  })

  it('updates job level when selecting', () => {
    renderWithRouter(<AdvancedSearch onSearch={vi.fn()} />)
    
    const levelSelect = screen.getByText(/nível/i).nextElementSibling
    if (levelSelect) {
      fireEvent.change(levelSelect, { target: { value: 'senior' } })
      expect(levelSelect).toHaveValue('senior')
    }
  })

  it('updates salary range when using slider', () => {
    renderWithRouter(<AdvancedSearch onSearch={vi.fn()} />)
    
    const salarySlider = screen.getByRole('slider')
    fireEvent.change(salarySlider, { target: { value: '10000' } })
    
    expect(screen.getByText(/R\$ 10.000/)).toBeInTheDocument()
  })

  it('updates location when typing', () => {
    renderWithRouter(<AdvancedSearch onSearch={vi.fn()} />)
    
    const locationInput = screen.getByText(/localização/i).nextElementSibling
    if (locationInput) {
      fireEvent.change(locationInput, { target: { value: 'São Paulo' } })
      expect(locationInput).toHaveValue('São Paulo')
    }
  })

  it('calls onSearch with search parameters when form is submitted', async () => {
    const onSearch = vi.fn()
    renderWithRouter(<AdvancedSearch onSearch={onSearch} />)
    
    // Fill in search form
    fireEvent.change(screen.getByPlaceholderText(/palavras-chave/i), {
      target: { value: 'React Developer' }
    })
    fireEvent.click(screen.getByText(/remoto/i))
    
    const levelSelect = screen.getByText(/nível/i).nextElementSibling
    if (levelSelect) {
      fireEvent.change(levelSelect, { target: { value: 'senior' } })
    }
    
    const locationInput = screen.getByText(/localização/i).nextElementSibling
    if (locationInput) {
      fireEvent.change(locationInput, { target: { value: 'São Paulo' } })
    }
    
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    fireEvent.click(searchButton)
    
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith({
        types: [],
        levels: ['senior'],
        skills: [],
        salary: {
          min: 0,
          max: 50000
        },
        location: 'São Paulo',
        remote: true,
        hybrid: false,
        onsite: false,
        keywords: 'React Developer'
      })
    })
  })

  it('resets form when reset button is clicked', () => {
    renderWithRouter(<AdvancedSearch onSearch={vi.fn()} />)
    
    // Fill in search form
    fireEvent.change(screen.getByPlaceholderText(/palavras-chave/i), {
      target: { value: 'React Developer' }
    })
    fireEvent.click(screen.getByText(/remoto/i))
    
    const levelSelect = screen.getByText(/nível/i).nextElementSibling
    if (levelSelect) {
      fireEvent.change(levelSelect, { target: { value: 'senior' } })
    }
    
    const locationInput = screen.getByText(/localização/i).nextElementSibling
    if (locationInput) {
      fireEvent.change(locationInput, { target: { value: 'São Paulo' } })
    }
    
    const resetButton = screen.getByRole('button', { name: /limpar/i })
    fireEvent.click(resetButton)
    
    expect(screen.getByPlaceholderText(/palavras-chave/i)).toHaveValue('')
    expect(screen.getByText(/remoto/i)).not.toBeChecked()
    if (levelSelect) {
      expect(levelSelect).toHaveValue('')
    }
    if (locationInput) {
      expect(locationInput).toHaveValue('')
    }
  })

  it('calls onSave when save button is clicked', () => {
    const onSave = vi.fn()
    renderWithRouter(<AdvancedSearch onSearch={vi.fn()} onSave={onSave} />)
    
    const saveButton = screen.getByRole('button', { name: /salvar busca/i })
    fireEvent.click(saveButton)
    
    expect(onSave).toHaveBeenCalled()
  })

  it('calls onCreateAlert when create alert button is clicked', () => {
    const onCreateAlert = vi.fn()
    renderWithRouter(<AdvancedSearch onSearch={vi.fn()} onCreateAlert={onCreateAlert} />)
    
    const createAlertButton = screen.getByRole('button', { name: /criar alerta/i })
    fireEvent.click(createAlertButton)
    
    expect(onCreateAlert).toHaveBeenCalled()
  })
}) 