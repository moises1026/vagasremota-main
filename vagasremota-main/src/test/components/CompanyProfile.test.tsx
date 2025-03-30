import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CompanyProfile } from '@/components/CompanyProfile'
import { useAuth } from '@/contexts/AuthContext'

// Mock AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn()
}))

const mockUser = {
  id: '1',
  name: 'Test Company',
  email: 'company@example.com',
  role: 'empresa',
  createdAt: new Date()
}

const mockCompany = {
  id: '1',
  name: 'Tech Company',
  description: 'Empresa de tecnologia focada em desenvolvimento web',
  website: 'https://techcompany.com',
  logo: 'https://techcompany.com/logo.png',
  industry: 'Tecnologia',
  size: '50-100',
  founded: '2020',
  location: 'São Paulo, SP',
  benefits: ['Vale Refeição', 'Vale Transporte', 'Plano de Saúde'],
  culture: 'Cultura de inovação e colaboração',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('CompanyProfile', () => {
  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: mockUser })
  })

  it('renders company information correctly', () => {
    renderWithRouter(<CompanyProfile company={mockCompany} />)
    
    expect(screen.getByText(mockCompany.name)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.description)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.industry)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.size)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.founded)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.location)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.culture)).toBeInTheDocument()
  })

  it('displays company benefits as tags', () => {
    renderWithRouter(<CompanyProfile company={mockCompany} />)
    
    mockCompany.benefits.forEach(benefit => {
      expect(screen.getByText(benefit)).toBeInTheDocument()
    })
  })

  it('opens edit mode when edit button is clicked', () => {
    renderWithRouter(<CompanyProfile company={mockCompany} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/indústria/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tamanho/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/fundação/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/localização/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cultura/i)).toBeInTheDocument()
  })

  it('validates required fields in edit mode', async () => {
    renderWithRouter(<CompanyProfile company={mockCompany} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument()
      expect(screen.getByText(/website é obrigatório/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const onSubmit = jest.fn()
    renderWithRouter(<CompanyProfile company={mockCompany} onSubmit={onSubmit} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Updated Company Name' }
    })
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: 'Updated company description' }
    })
    fireEvent.change(screen.getByLabelText(/website/i), {
      target: { value: 'https://updatedcompany.com' }
    })
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        ...mockCompany,
        name: 'Updated Company Name',
        description: 'Updated company description',
        website: 'https://updatedcompany.com'
      })
    })
  })

  it('displays error message when submission fails', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Erro ao atualizar perfil'))
    renderWithRouter(<CompanyProfile company={mockCompany} onSubmit={onSubmit} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Updated Company Name' }
    })
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao atualizar perfil/i)).toBeInTheDocument()
    })
  })

  it('validates URL format for website', async () => {
    renderWithRouter(<CompanyProfile company={mockCompany} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    fireEvent.change(screen.getByLabelText(/website/i), {
      target: { value: 'invalid-url' }
    })
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText(/url inválida/i)).toBeInTheDocument()
    })
  })
}) 