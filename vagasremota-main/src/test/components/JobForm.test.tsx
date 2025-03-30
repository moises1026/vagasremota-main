import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { JobForm } from '@/components/JobForm'
import { useAuth } from '@/contexts/AuthContext'

// Mock AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn()
}))

const mockUser = {
  id: '1',
  name: 'Test Recruiter',
  email: 'recruiter@example.com',
  role: 'recrutador',
  createdAt: new Date()
}

const mockJob = {
  id: '1',
  title: 'Desenvolvedor Full Stack',
  company: 'Tech Company',
  location: 'Remoto',
  type: 'CLT',
  description: 'Vaga para desenvolvedor full stack com experiência em React e Node.js',
  requirements: ['React', 'Node.js', 'TypeScript'],
  salary: 'R$ 5.000,00 - R$ 8.000,00',
  createdAt: new Date().toISOString(),
  companyId: '1',
  level: 'Pleno',
  skills: ['React', 'Node.js', 'TypeScript', 'Python'],
  benefits: ['Vale Refeição', 'Vale Transporte', 'Plano de Saúde'],
  status: 'active',
  updatedAt: new Date().toISOString(),
  applicationsCount: 0,
  viewsCount: 0
}

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('JobForm', () => {
  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: mockUser })
  })

  it('renders form fields correctly', () => {
    renderWithRouter(<JobForm />)
    
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/requisitos/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/salário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tipo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nível/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/localização/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/benefícios/i)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    renderWithRouter(<JobForm />)
    
    const submitButton = screen.getByRole('button', { name: /publicar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/título é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument()
      expect(screen.getByText(/requisitos são obrigatórios/i)).toBeInTheDocument()
      expect(screen.getByText(/salário é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/tipo é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/nível é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/localização é obrigatória/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const onSubmit = jest.fn()
    renderWithRouter(<JobForm onSubmit={onSubmit} />)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: 'Desenvolvedor Full Stack' }
    })
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: 'Vaga para desenvolvedor full stack com experiência em React e Node.js' }
    })
    fireEvent.change(screen.getByLabelText(/requisitos/i), {
      target: { value: 'React, Node.js, TypeScript' }
    })
    fireEvent.change(screen.getByLabelText(/salário/i), {
      target: { value: 'R$ 5.000,00 - R$ 8.000,00' }
    })
    fireEvent.change(screen.getByLabelText(/tipo/i), {
      target: { value: 'CLT' }
    })
    fireEvent.change(screen.getByLabelText(/nível/i), {
      target: { value: 'Pleno' }
    })
    fireEvent.change(screen.getByLabelText(/localização/i), {
      target: { value: 'Remoto' }
    })
    fireEvent.change(screen.getByLabelText(/benefícios/i), {
      target: { value: 'Vale Refeição, Vale Transporte, Plano de Saúde' }
    })
    
    const submitButton = screen.getByRole('button', { name: /publicar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'Desenvolvedor Full Stack',
        description: 'Vaga para desenvolvedor full stack com experiência em React e Node.js',
        requirements: ['React', 'Node.js', 'TypeScript'],
        salary: 'R$ 5.000,00 - R$ 8.000,00',
        type: 'CLT',
        level: 'Pleno',
        location: 'Remoto',
        benefits: ['Vale Refeição', 'Vale Transporte', 'Plano de Saúde'],
        companyId: mockUser.id
      })
    })
  })

  it('displays error message when submission fails', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Erro ao publicar vaga'))
    renderWithRouter(<JobForm onSubmit={onSubmit} />)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: 'Desenvolvedor Full Stack' }
    })
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: 'Vaga para desenvolvedor full stack com experiência em React e Node.js' }
    })
    fireEvent.change(screen.getByLabelText(/requisitos/i), {
      target: { value: 'React, Node.js, TypeScript' }
    })
    fireEvent.change(screen.getByLabelText(/salário/i), {
      target: { value: 'R$ 5.000,00 - R$ 8.000,00' }
    })
    fireEvent.change(screen.getByLabelText(/tipo/i), {
      target: { value: 'CLT' }
    })
    fireEvent.change(screen.getByLabelText(/nível/i), {
      target: { value: 'Pleno' }
    })
    fireEvent.change(screen.getByLabelText(/localização/i), {
      target: { value: 'Remoto' }
    })
    
    const submitButton = screen.getByRole('button', { name: /publicar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao publicar vaga/i)).toBeInTheDocument()
    })
  })

  it('validates salary format', async () => {
    renderWithRouter(<JobForm />)
    
    fireEvent.change(screen.getByLabelText(/salário/i), {
      target: { value: 'invalid-salary' }
    })
    
    const submitButton = screen.getByRole('button', { name: /publicar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/formato de salário inválido/i)).toBeInTheDocument()
    })
  })

  it('validates requirements format', async () => {
    renderWithRouter(<JobForm />)
    
    fireEvent.change(screen.getByLabelText(/requisitos/i), {
      target: { value: 'React, Node.js, TypeScript, ' }
    })
    
    const submitButton = screen.getByRole('button', { name: /publicar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/formato de requisitos inválido/i)).toBeInTheDocument()
    })
  })

  it('validates benefits format', async () => {
    renderWithRouter(<JobForm />)
    
    fireEvent.change(screen.getByLabelText(/benefícios/i), {
      target: { value: 'Vale Refeição, Vale Transporte, Plano de Saúde, ' }
    })
    
    const submitButton = screen.getByRole('button', { name: /publicar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/formato de benefícios inválido/i)).toBeInTheDocument()
    })
  })

  it('pre-fills form with job data when editing', () => {
    renderWithRouter(<JobForm job={mockJob} />)
    
    expect(screen.getByLabelText(/título/i)).toHaveValue(mockJob.title)
    expect(screen.getByLabelText(/descrição/i)).toHaveValue(mockJob.description)
    expect(screen.getByLabelText(/requisitos/i)).toHaveValue(mockJob.requirements.join(', '))
    expect(screen.getByLabelText(/salário/i)).toHaveValue(mockJob.salary)
    expect(screen.getByLabelText(/tipo/i)).toHaveValue(mockJob.type)
    expect(screen.getByLabelText(/nível/i)).toHaveValue(mockJob.level)
    expect(screen.getByLabelText(/localização/i)).toHaveValue(mockJob.location)
    expect(screen.getByLabelText(/benefícios/i)).toHaveValue(mockJob.benefits.join(', '))
  })
}) 