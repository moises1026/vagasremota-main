import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { JobList } from '@/components/JobList'

const mockJobs = [
  {
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
  },
  {
    id: '2',
    title: 'Desenvolvedor Frontend',
    company: 'Digital Agency',
    location: 'Híbrido',
    type: 'PJ',
    description: 'Vaga para desenvolvedor frontend com experiência em React e TypeScript',
    requirements: ['React', 'TypeScript', 'CSS'],
    salary: 'R$ 4.000,00 - R$ 6.000,00',
    createdAt: new Date().toISOString(),
    companyId: '2',
    level: 'Júnior',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    benefits: ['Vale Refeição', 'Plano de Saúde'],
    status: 'active',
    updatedAt: new Date().toISOString()
  }
]

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('JobList', () => {
  it('renders job cards correctly', () => {
    renderWithRouter(<JobList jobs={mockJobs} />)
    
    mockJobs.forEach(job => {
      expect(screen.getByText(job.title)).toBeInTheDocument()
      expect(screen.getByText(job.company)).toBeInTheDocument()
      expect(screen.getByText(job.location)).toBeInTheDocument()
      expect(screen.getByText(job.type)).toBeInTheDocument()
      expect(screen.getByText(job.level)).toBeInTheDocument()
      expect(screen.getByText(job.salary)).toBeInTheDocument()
    })
  })

  it('displays job requirements as tags', () => {
    renderWithRouter(<JobList jobs={mockJobs} />)
    
    mockJobs.forEach(job => {
      job.requirements.forEach(requirement => {
        expect(screen.getByText(requirement)).toBeInTheDocument()
      })
    })
  })

  it('navigates to job details when clicking a job card', () => {
    renderWithRouter(<JobList jobs={mockJobs} />)
    
    const jobCard = screen.getByText(mockJobs[0].title).closest('div')
    fireEvent.click(jobCard)
    
    expect(window.location.pathname).toBe(`/jobs/${mockJobs[0].id}`)
  })

  it('filters jobs by search term', () => {
    renderWithRouter(<JobList jobs={mockJobs} />)
    
    const searchInput = screen.getByPlaceholderText(/buscar vagas/i)
    fireEvent.change(searchInput, { target: { value: 'Frontend' } })
    
    expect(screen.getByText('Desenvolvedor Frontend')).toBeInTheDocument()
    expect(screen.queryByText('Desenvolvedor Full Stack')).not.toBeInTheDocument()
  })

  it('filters jobs by type', () => {
    renderWithRouter(<JobList jobs={mockJobs} />)
    
    const typeFilter = screen.getByLabelText(/tipo/i)
    fireEvent.change(typeFilter, { target: { value: 'PJ' } })
    
    expect(screen.getByText('Desenvolvedor Frontend')).toBeInTheDocument()
    expect(screen.queryByText('Desenvolvedor Full Stack')).not.toBeInTheDocument()
  })

  it('filters jobs by level', () => {
    renderWithRouter(<JobList jobs={mockJobs} />)
    
    const levelFilter = screen.getByLabelText(/nível/i)
    fireEvent.change(levelFilter, { target: { value: 'Júnior' } })
    
    expect(screen.getByText('Desenvolvedor Frontend')).toBeInTheDocument()
    expect(screen.queryByText('Desenvolvedor Full Stack')).not.toBeInTheDocument()
  })

  it('displays empty state when no jobs match filters', () => {
    renderWithRouter(<JobList jobs={mockJobs} />)
    
    const searchInput = screen.getByPlaceholderText(/buscar vagas/i)
    fireEvent.change(searchInput, { target: { value: 'Non-existent Job' } })
    
    expect(screen.getByText(/nenhuma vaga encontrada/i)).toBeInTheDocument()
  })

  it('displays loading state while fetching jobs', () => {
    renderWithRouter(<JobList jobs={[]} isLoading={true} />)
    
    expect(screen.getByText(/carregando vagas/i)).toBeInTheDocument()
  })

  it('displays error message when fetching jobs fails', () => {
    renderWithRouter(<JobList jobs={[]} error="Erro ao carregar vagas" />)
    
    expect(screen.getByText(/erro ao carregar vagas/i)).toBeInTheDocument()
  })

  it('sorts jobs by date when clicking sort button', () => {
    renderWithRouter(<JobList jobs={mockJobs} />)
    
    const sortButton = screen.getByRole('button', { name: /ordenar por data/i })
    fireEvent.click(sortButton)
    
    const jobCards = screen.getAllByRole('article')
    expect(jobCards[0]).toHaveTextContent(mockJobs[1].title) // Most recent job first
    expect(jobCards[1]).toHaveTextContent(mockJobs[0].title)
  })

  it('sorts jobs by salary when clicking sort button', () => {
    renderWithRouter(<JobList jobs={mockJobs} />)
    
    const sortButton = screen.getByRole('button', { name: /ordenar por salário/i })
    fireEvent.click(sortButton)
    
    const jobCards = screen.getAllByRole('article')
    expect(jobCards[0]).toHaveTextContent(mockJobs[0].title) // Highest salary first
    expect(jobCards[1]).toHaveTextContent(mockJobs[1].title)
  })
}) 