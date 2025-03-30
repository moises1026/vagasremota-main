import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { JobFilters } from '@/components/JobFilters'

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('JobFilters', () => {
  const mockFilters = {
    type: ['CLT', 'PJ', 'Freelance'],
    level: ['Júnior', 'Pleno', 'Sênior'],
    location: ['Remoto', 'Híbrido', 'Presencial'],
    skills: ['React', 'Node.js', 'TypeScript', 'Python']
  }

  it('renders filter options correctly', () => {
    renderWithRouter(<JobFilters filters={mockFilters} />)
    
    // Check type filters
    expect(screen.getByText(/CLT/i)).toBeInTheDocument()
    expect(screen.getByText(/PJ/i)).toBeInTheDocument()
    expect(screen.getByText(/Freelance/i)).toBeInTheDocument()
    
    // Check level filters
    expect(screen.getByText(/Júnior/i)).toBeInTheDocument()
    expect(screen.getByText(/Pleno/i)).toBeInTheDocument()
    expect(screen.getByText(/Sênior/i)).toBeInTheDocument()
    
    // Check location filters
    expect(screen.getByText(/Remoto/i)).toBeInTheDocument()
    expect(screen.getByText(/Híbrido/i)).toBeInTheDocument()
    expect(screen.getByText(/Presencial/i)).toBeInTheDocument()
    
    // Check skills filters
    expect(screen.getByText(/React/i)).toBeInTheDocument()
    expect(screen.getByText(/Node.js/i)).toBeInTheDocument()
    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument()
    expect(screen.getByText(/Python/i)).toBeInTheDocument()
  })

  it('calls onFilterChange when type filter is clicked', () => {
    const onFilterChange = jest.fn()
    renderWithRouter(<JobFilters filters={mockFilters} onFilterChange={onFilterChange} />)
    
    const cltFilter = screen.getByText(/CLT/i)
    fireEvent.click(cltFilter)
    
    expect(onFilterChange).toHaveBeenCalledWith('type', 'CLT')
  })

  it('calls onFilterChange when level filter is clicked', () => {
    const onFilterChange = jest.fn()
    renderWithRouter(<JobFilters filters={mockFilters} onFilterChange={onFilterChange} />)
    
    const plenoFilter = screen.getByText(/Pleno/i)
    fireEvent.click(plenoFilter)
    
    expect(onFilterChange).toHaveBeenCalledWith('level', 'Pleno')
  })

  it('calls onFilterChange when location filter is clicked', () => {
    const onFilterChange = jest.fn()
    renderWithRouter(<JobFilters filters={mockFilters} onFilterChange={onFilterChange} />)
    
    const remotoFilter = screen.getByText(/Remoto/i)
    fireEvent.click(remotoFilter)
    
    expect(onFilterChange).toHaveBeenCalledWith('location', 'Remoto')
  })

  it('calls onFilterChange when skill filter is clicked', () => {
    const onFilterChange = jest.fn()
    renderWithRouter(<JobFilters filters={mockFilters} onFilterChange={onFilterChange} />)
    
    const reactFilter = screen.getByText(/React/i)
    fireEvent.click(reactFilter)
    
    expect(onFilterChange).toHaveBeenCalledWith('skills', 'React')
  })

  it('toggles filter selection when clicked twice', () => {
    const onFilterChange = jest.fn()
    renderWithRouter(<JobFilters filters={mockFilters} onFilterChange={onFilterChange} />)
    
    const cltFilter = screen.getByText(/CLT/i)
    fireEvent.click(cltFilter)
    fireEvent.click(cltFilter)
    
    expect(onFilterChange).toHaveBeenCalledTimes(2)
    expect(onFilterChange).toHaveBeenNthCalledWith(1, 'type', 'CLT')
    expect(onFilterChange).toHaveBeenNthCalledWith(2, 'type', 'CLT')
  })

  it('displays selected filters with active state', () => {
    const selectedFilters = {
      type: ['CLT'],
      level: ['Pleno'],
      location: ['Remoto'],
      skills: ['React']
    }
    
    renderWithRouter(<JobFilters filters={mockFilters} selectedFilters={selectedFilters} />)
    
    expect(screen.getByText(/CLT/i)).toHaveClass('active')
    expect(screen.getByText(/Pleno/i)).toHaveClass('active')
    expect(screen.getByText(/Remoto/i)).toHaveClass('active')
    expect(screen.getByText(/React/i)).toHaveClass('active')
  })

  it('clears all filters when clear button is clicked', () => {
    const onClearFilters = jest.fn()
    renderWithRouter(<JobFilters filters={mockFilters} onClearFilters={onClearFilters} />)
    
    const clearButton = screen.getByRole('button', { name: /limpar filtros/i })
    fireEvent.click(clearButton)
    
    expect(onClearFilters).toHaveBeenCalled()
  })

  it('displays filter count when filters are selected', () => {
    const selectedFilters = {
      type: ['CLT'],
      level: ['Pleno'],
      location: ['Remoto'],
      skills: ['React', 'Node.js']
    }
    
    renderWithRouter(<JobFilters filters={mockFilters} selectedFilters={selectedFilters} />)
    
    expect(screen.getByText(/5 filtros selecionados/i)).toBeInTheDocument()
  })
}) 