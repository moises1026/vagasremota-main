import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ApplicationForm } from '@/components/ApplicationForm'
import { useAuth } from '@/contexts/AuthContext'

// Mock AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn()
}))

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'candidato',
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
  skills: ['React', 'Node.js', 'TypeScript'],
  benefits: ['Vale Refeição', 'Vale Transporte', 'Plano de Saúde'],
  status: 'active',
  updatedAt: new Date().toISOString()
}

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ApplicationForm', () => {
  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: mockUser })
  })

  it('renders form fields correctly', () => {
    renderWithRouter(<ApplicationForm job={mockJob} />)
    
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/currículo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/portfolio/i)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    renderWithRouter(<ApplicationForm job={mockJob} />)
    
    const submitButton = screen.getByRole('button', { name: /candidatar-se/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument()
      expect(screen.getByText(/currículo é obrigatório/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const onSubmit = jest.fn()
    renderWithRouter(<ApplicationForm job={mockJob} onSubmit={onSubmit} />)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: 'Olá, tenho interesse na vaga!' }
    })
    fireEvent.change(screen.getByLabelText(/currículo/i), {
      target: { value: 'https://example.com/resume.pdf' }
    })
    fireEvent.change(screen.getByLabelText(/portfolio/i), {
      target: { value: 'https://example.com/portfolio' }
    })
    
    const submitButton = screen.getByRole('button', { name: /candidatar-se/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        jobId: mockJob.id,
        candidateId: mockUser.id,
        message: 'Olá, tenho interesse na vaga!',
        resume: 'https://example.com/resume.pdf',
        portfolio: 'https://example.com/portfolio'
      })
    })
  })

  it('displays error message when submission fails', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Erro ao candidatar-se'))
    renderWithRouter(<ApplicationForm job={mockJob} onSubmit={onSubmit} />)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: 'Olá, tenho interesse na vaga!' }
    })
    fireEvent.change(screen.getByLabelText(/currículo/i), {
      target: { value: 'https://example.com/resume.pdf' }
    })
    
    const submitButton = screen.getByRole('button', { name: /candidatar-se/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao candidatar-se/i)).toBeInTheDocument()
    })
  })

  it('validates URL format for portfolio', async () => {
    renderWithRouter(<ApplicationForm job={mockJob} />)
    
    fireEvent.change(screen.getByLabelText(/portfolio/i), {
      target: { value: 'invalid-url' }
    })
    
    const submitButton = screen.getByRole('button', { name: /candidatar-se/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/url inválida/i)).toBeInTheDocument()
    })
  })
}) 