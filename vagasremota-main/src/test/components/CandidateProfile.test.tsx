import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CandidateProfile } from '@/components/CandidateProfile'
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

describe('CandidateProfile', () => {
  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: mockUser })
  })

  it('renders candidate information correctly', () => {
    renderWithRouter(<CandidateProfile candidate={mockCandidate} />)
    
    expect(screen.getByText(mockCandidate.name)).toBeInTheDocument()
    expect(screen.getByText(mockCandidate.email)).toBeInTheDocument()
    expect(screen.getByText(mockCandidate.phone)).toBeInTheDocument()
    expect(screen.getByText(mockCandidate.location)).toBeInTheDocument()
    expect(screen.getByText(mockCandidate.bio)).toBeInTheDocument()
  })

  it('displays candidate skills as tags', () => {
    renderWithRouter(<CandidateProfile candidate={mockCandidate} />)
    
    mockCandidate.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('displays experience information', () => {
    renderWithRouter(<CandidateProfile candidate={mockCandidate} />)
    
    const experience = mockCandidate.experience[0]
    expect(screen.getByText(experience.company)).toBeInTheDocument()
    expect(screen.getByText(experience.position)).toBeInTheDocument()
    expect(screen.getByText(experience.description)).toBeInTheDocument()
  })

  it('displays education information', () => {
    renderWithRouter(<CandidateProfile candidate={mockCandidate} />)
    
    const education = mockCandidate.education[0]
    expect(screen.getByText(education.institution)).toBeInTheDocument()
    expect(screen.getByText(education.degree)).toBeInTheDocument()
  })

  it('displays language information', () => {
    renderWithRouter(<CandidateProfile candidate={mockCandidate} />)
    
    mockCandidate.languages.forEach(language => {
      expect(screen.getByText(language.name)).toBeInTheDocument()
      expect(screen.getByText(language.level)).toBeInTheDocument()
    })
  })

  it('opens edit mode when edit button is clicked', () => {
    renderWithRouter(<CandidateProfile candidate={mockCandidate} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/localização/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument()
  })

  it('validates required fields in edit mode', async () => {
    renderWithRouter(<CandidateProfile candidate={mockCandidate} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/telefone é obrigatório/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const onSubmit = jest.fn()
    renderWithRouter(<CandidateProfile candidate={mockCandidate} onSubmit={onSubmit} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Updated Name' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'updated@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/telefone/i), {
      target: { value: '(11) 98888-8888' }
    })
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        ...mockCandidate,
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '(11) 98888-8888'
      })
    })
  })

  it('displays error message when submission fails', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Erro ao atualizar perfil'))
    renderWithRouter(<CandidateProfile candidate={mockCandidate} onSubmit={onSubmit} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Updated Name' }
    })
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao atualizar perfil/i)).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    renderWithRouter(<CandidateProfile candidate={mockCandidate} />)
    
    const editButton = screen.getByRole('button', { name: /editar/i })
    fireEvent.click(editButton)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' }
    })
    
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
    })
  })
}) 