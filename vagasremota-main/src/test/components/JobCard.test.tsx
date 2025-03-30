import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { JobCard } from '@/components/JobCard'

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

describe('JobCard', () => {
  it('renders job information correctly', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    expect(screen.getByText(mockJob.title)).toBeInTheDocument()
    expect(screen.getByText(mockJob.company)).toBeInTheDocument()
    expect(screen.getByText(mockJob.location)).toBeInTheDocument()
    expect(screen.getByText(mockJob.type)).toBeInTheDocument()
    expect(screen.getByText(mockJob.level)).toBeInTheDocument()
    expect(screen.getByText(mockJob.salary)).toBeInTheDocument()
    expect(screen.getByText(mockJob.description)).toBeInTheDocument()
  })

  it('displays job requirements as tags', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    mockJob.requirements.forEach(requirement => {
      expect(screen.getByText(requirement)).toBeInTheDocument()
    })
  })

  it('displays job skills as tags', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    mockJob.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('displays job benefits as tags', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    mockJob.benefits.forEach(benefit => {
      expect(screen.getByText(benefit)).toBeInTheDocument()
    })
  })

  it('navigates to job details when clicking the card', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    const card = screen.getByRole('article')
    fireEvent.click(card)
    
    expect(window.location.pathname).toBe(`/jobs/${mockJob.id}`)
  })

  it('displays job creation date in correct format', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    const date = new Date(mockJob.createdAt)
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    
    expect(screen.getByText(formattedDate)).toBeInTheDocument()
  })

  it('displays job status badge', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    expect(screen.getByText(/ativo/i)).toBeInTheDocument()
  })

  it('displays job status badge with correct color', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    const statusBadge = screen.getByText(/ativo/i)
    expect(statusBadge).toHaveClass('active')
  })

  it('displays job status badge with inactive color when job is inactive', () => {
    const inactiveJob = { ...mockJob, status: 'inactive' }
    renderWithRouter(<JobCard job={inactiveJob} />)
    
    const statusBadge = screen.getByText(/inativo/i)
    expect(statusBadge).toHaveClass('inactive')
  })

  it('displays job type badge with correct color', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    const typeBadge = screen.getByText(mockJob.type)
    expect(typeBadge).toHaveClass('type-badge')
  })

  it('displays job level badge with correct color', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    const levelBadge = screen.getByText(mockJob.level)
    expect(levelBadge).toHaveClass('level-badge')
  })

  it('displays job location badge with correct color', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    const locationBadge = screen.getByText(mockJob.location)
    expect(locationBadge).toHaveClass('location-badge')
  })

  it('displays job applications count', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    expect(screen.getByText(/0 candidaturas/i)).toBeInTheDocument()
  })

  it('displays job views count', () => {
    renderWithRouter(<JobCard job={mockJob} />)
    
    expect(screen.getByText(/0 visualizações/i)).toBeInTheDocument()
  })
}) 