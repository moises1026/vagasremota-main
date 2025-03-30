import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { JobSearch } from '@/components/JobSearch'

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('JobSearch', () => {
  it('renders search form correctly', () => {
    renderWithRouter(<JobSearch />)
    
    expect(screen.getByPlaceholderText(/buscar vagas/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tipo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nível/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/localização/i)).toBeInTheDocument()
  })

  it('updates search term when typing', () => {
    renderWithRouter(<JobSearch />)
    
    const searchInput = screen.getByPlaceholderText(/buscar vagas/i)
    fireEvent.change(searchInput, { target: { value: 'React Developer' } })
    
    expect(searchInput).toHaveValue('React Developer')
  })

  it('updates job type when selecting', () => {
    renderWithRouter(<JobSearch />)
    
    const typeSelect = screen.getByLabelText(/tipo/i)
    fireEvent.change(typeSelect, { target: { value: 'CLT' } })
    
    expect(typeSelect).toHaveValue('CLT')
  })

  it('updates job level when selecting', () => {
    renderWithRouter(<JobSearch />)
    
    const levelSelect = screen.getByLabelText(/nível/i)
    fireEvent.change(levelSelect, { target: { value: 'Pleno' } })
    
    expect(levelSelect).toHaveValue('Pleno')
  })

  it('updates location when typing', () => {
    renderWithRouter(<JobSearch />)
    
    const locationInput = screen.getByLabelText(/localização/i)
    fireEvent.change(locationInput, { target: { value: 'São Paulo' } })
    
    expect(locationInput).toHaveValue('São Paulo')
  })

  it('calls onSearch with search parameters when form is submitted', async () => {
    const onSearch = jest.fn()
    renderWithRouter(<JobSearch onSearch={onSearch} />)
    
    // Fill in search form
    fireEvent.change(screen.getByPlaceholderText(/buscar vagas/i), {
      target: { value: 'React Developer' }
    })
    fireEvent.change(screen.getByLabelText(/tipo/i), {
      target: { value: 'CLT' }
    })
    fireEvent.change(screen.getByLabelText(/nível/i), {
      target: { value: 'Pleno' }
    })
    fireEvent.change(screen.getByLabelText(/localização/i), {
      target: { value: 'São Paulo' }
    })
    
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    fireEvent.click(searchButton)
    
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith({
        searchTerm: 'React Developer',
        type: 'CLT',
        level: 'Pleno',
        location: 'São Paulo'
      })
    })
  })

  it('clears form when clear button is clicked', () => {
    renderWithRouter(<JobSearch />)
    
    // Fill in search form
    fireEvent.change(screen.getByPlaceholderText(/buscar vagas/i), {
      target: { value: 'React Developer' }
    })
    fireEvent.change(screen.getByLabelText(/tipo/i), {
      target: { value: 'CLT' }
    })
    fireEvent.change(screen.getByLabelText(/nível/i), {
      target: { value: 'Pleno' }
    })
    fireEvent.change(screen.getByLabelText(/localização/i), {
      target: { value: 'São Paulo' }
    })
    
    const clearButton = screen.getByRole('button', { name: /limpar/i })
    fireEvent.click(clearButton)
    
    expect(screen.getByPlaceholderText(/buscar vagas/i)).toHaveValue('')
    expect(screen.getByLabelText(/tipo/i)).toHaveValue('')
    expect(screen.getByLabelText(/nível/i)).toHaveValue('')
    expect(screen.getByLabelText(/localização/i)).toHaveValue('')
  })

  it('displays loading state while searching', async () => {
    const onSearch = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    renderWithRouter(<JobSearch onSearch={onSearch} />)
    
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    fireEvent.click(searchButton)
    
    expect(screen.getByText(/buscando/i)).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.queryByText(/buscando/i)).not.toBeInTheDocument()
    })
  })

  it('displays error message when search fails', async () => {
    const onSearch = jest.fn().mockRejectedValue(new Error('Erro ao buscar vagas'))
    renderWithRouter(<JobSearch onSearch={onSearch} />)
    
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    fireEvent.click(searchButton)
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao buscar vagas/i)).toBeInTheDocument()
    })
  })
}) 