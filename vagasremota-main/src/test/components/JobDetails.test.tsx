import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { JobDetails } from '@/components/JobDetails'
import { useAuth } from '@/contexts/AuthContext'

// Mock AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn()
}))

const mockUser = {
  id: '1',
  name: 'Test Candidate',
  email: 'candidate@example.com',
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
  skills: ['React', 'Node.js', 'TypeScript', 'Python'],
  benefits: ['Vale Refeição', 'Vale Transporte', 'Plano de Saúde'],
  status: 'active',
  updatedAt: new Date().toISOString()
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

describe('JobDetails', () => {
  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: mockUser })
  })

  it('renders job information correctly', () => {
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} />)
    
    expect(screen.getByText(mockJob.title)).toBeInTheDocument()
    expect(screen.getByText(mockJob.company)).toBeInTheDocument()
    expect(screen.getByText(mockJob.location)).toBeInTheDocument()
    expect(screen.getByText(mockJob.type)).toBeInTheDocument()
    expect(screen.getByText(mockJob.level)).toBeInTheDocument()
    expect(screen.getByText(mockJob.salary)).toBeInTheDocument()
    expect(screen.getByText(mockJob.description)).toBeInTheDocument()
  })

  it('displays job requirements as tags', () => {
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} />)
    
    mockJob.requirements.forEach(requirement => {
      expect(screen.getByText(requirement)).toBeInTheDocument()
    })
  })

  it('displays job skills as tags', () => {
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} />)
    
    mockJob.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('displays job benefits as tags', () => {
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} />)
    
    mockJob.benefits.forEach(benefit => {
      expect(screen.getByText(benefit)).toBeInTheDocument()
    })
  })

  it('displays company information correctly', () => {
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} />)
    
    expect(screen.getByText(mockCompany.description)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.industry)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.size)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.founded)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.location)).toBeInTheDocument()
    expect(screen.getByText(mockCompany.culture)).toBeInTheDocument()
  })

  it('opens application form when apply button is clicked', () => {
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} />)
    
    const applyButton = screen.getByRole('button', { name: /candidatar-se/i })
    fireEvent.click(applyButton)
    
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/currículo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/portfolio/i)).toBeInTheDocument()
  })

  it('validates required fields in application form', async () => {
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} />)
    
    const applyButton = screen.getByRole('button', { name: /candidatar-se/i })
    fireEvent.click(applyButton)
    
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument()
      expect(screen.getByText(/currículo é obrigatório/i)).toBeInTheDocument()
    })
  })

  it('submits application form with valid data', async () => {
    const onSubmit = jest.fn()
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} onSubmit={onSubmit} />)
    
    const applyButton = screen.getByRole('button', { name: /candidatar-se/i })
    fireEvent.click(applyButton)
    
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
    
    const submitButton = screen.getByRole('button', { name: /enviar/i })
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

  it('displays error message when application submission fails', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Erro ao candidatar-se'))
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} onSubmit={onSubmit} />)
    
    const applyButton = screen.getByRole('button', { name: /candidatar-se/i })
    fireEvent.click(applyButton)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: 'Olá, tenho interesse na vaga!' }
    })
    fireEvent.change(screen.getByLabelText(/currículo/i), {
      target: { value: 'https://example.com/resume.pdf' }
    })
    
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao candidatar-se/i)).toBeInTheDocument()
    })
  })

  it('validates URL format for portfolio', async () => {
    renderWithRouter(<JobDetails job={mockJob} company={mockCompany} />)
    
    const applyButton = screen.getByRole('button', { name: /candidatar-se/i })
    fireEvent.click(applyButton)
    
    fireEvent.change(screen.getByLabelText(/portfolio/i), {
      target: { value: 'invalid-url' }
    })
    
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/url inválida/i)).toBeInTheDocument()
    })
  })
}) 