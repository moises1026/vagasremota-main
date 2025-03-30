import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { InterviewForm } from '@/components/InterviewForm'
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
  skills: ['React', 'Node.js', 'TypeScript'],
  benefits: ['Vale Refeição', 'Vale Transporte', 'Plano de Saúde'],
  status: 'active',
  updatedAt: new Date().toISOString()
}

const mockCandidate = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '(11) 99999-9999',
  location: 'São Paulo, SP',
  bio: 'Desenvolvedor Full Stack com 5 anos de experiência',
  skills: ['React', 'Node.js', 'TypeScript', 'Python'],
  experience: [
    {
      company: 'Tech Company',
      position: 'Desenvolvedor Full Stack',
      startDate: '2020-01',
      endDate: 'Present',
      description: 'Desenvolvimento de aplicações web com React e Node.js'
    }
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'Bacharel em Ciência da Computação',
      startDate: '2015',
      endDate: '2019'
    }
  ],
  languages: [
    {
      name: 'Português',
      level: 'Nativo'
    },
    {
      name: 'Inglês',
      level: 'Avançado'
    }
  ],
  portfolio: 'https://johndoe.com',
  resume: 'https://johndoe.com/resume.pdf',
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

describe('InterviewForm', () => {
  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: mockUser })
  })

  it('renders form fields correctly', () => {
    renderWithRouter(<InterviewForm job={mockJob} candidate={mockCandidate} />)
    
    expect(screen.getByLabelText(/tipo de entrevista/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data e hora/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/plataforma/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/link/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/observações/i)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    renderWithRouter(<InterviewForm job={mockJob} candidate={mockCandidate} />)
    
    const submitButton = screen.getByRole('button', { name: /agendar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/tipo de entrevista é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/data e hora são obrigatórios/i)).toBeInTheDocument()
      expect(screen.getByText(/plataforma é obrigatória/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const onSubmit = jest.fn()
    renderWithRouter(<InterviewForm job={mockJob} candidate={mockCandidate} onSubmit={onSubmit} />)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/tipo de entrevista/i), {
      target: { value: 'Técnica' }
    })
    fireEvent.change(screen.getByLabelText(/data e hora/i), {
      target: { value: '2024-03-20T10:00' }
    })
    fireEvent.change(screen.getByLabelText(/plataforma/i), {
      target: { value: 'Google Meet' }
    })
    fireEvent.change(screen.getByLabelText(/link/i), {
      target: { value: 'https://meet.google.com/abc-defg-hij' }
    })
    fireEvent.change(screen.getByLabelText(/observações/i), {
      target: { value: 'Por favor, prepare-se para discutir suas experiências com React e Node.js' }
    })
    
    const submitButton = screen.getByRole('button', { name: /agendar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        jobId: mockJob.id,
        candidateId: mockCandidate.id,
        type: 'Técnica',
        date: '2024-03-20T10:00',
        platform: 'Google Meet',
        link: 'https://meet.google.com/abc-defg-hij',
        notes: 'Por favor, prepare-se para discutir suas experiências com React e Node.js'
      })
    })
  })

  it('displays error message when submission fails', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Erro ao agendar entrevista'))
    renderWithRouter(<InterviewForm job={mockJob} candidate={mockCandidate} onSubmit={onSubmit} />)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/tipo de entrevista/i), {
      target: { value: 'Técnica' }
    })
    fireEvent.change(screen.getByLabelText(/data e hora/i), {
      target: { value: '2024-03-20T10:00' }
    })
    fireEvent.change(screen.getByLabelText(/plataforma/i), {
      target: { value: 'Google Meet' }
    })
    
    const submitButton = screen.getByRole('button', { name: /agendar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao agendar entrevista/i)).toBeInTheDocument()
    })
  })

  it('validates URL format for meeting link', async () => {
    renderWithRouter(<InterviewForm job={mockJob} candidate={mockCandidate} />)
    
    fireEvent.change(screen.getByLabelText(/link/i), {
      target: { value: 'invalid-url' }
    })
    
    const submitButton = screen.getByRole('button', { name: /agendar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/url inválida/i)).toBeInTheDocument()
    })
  })

  it('validates date is in the future', async () => {
    renderWithRouter(<InterviewForm job={mockJob} candidate={mockCandidate} />)
    
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1)
    
    fireEvent.change(screen.getByLabelText(/data e hora/i), {
      target: { value: pastDate.toISOString().slice(0, 16) }
    })
    
    const submitButton = screen.getByRole('button', { name: /agendar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/data deve ser no futuro/i)).toBeInTheDocument()
    })
  })
}) 