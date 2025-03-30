import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '@/components/Header'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          {component}
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Header', () => {
  it('renders logo and navigation links', () => {
    renderWithProviders(<Header />)
    
    expect(screen.getByText('Vagas Remota')).toBeInTheDocument()
    expect(screen.getByText('Vagas')).toBeInTheDocument()
    expect(screen.getByText('Entrar')).toBeInTheDocument()
    expect(screen.getByText('Cadastrar')).toBeInTheDocument()
  })

  it('toggles mobile menu when menu button is clicked', () => {
    renderWithProviders(<Header />)
    
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)
    
    expect(screen.getByText('Vagas')).toBeInTheDocument()
    expect(screen.getByText('Entrar')).toBeInTheDocument()
    expect(screen.getByText('Cadastrar')).toBeInTheDocument()
  })

  it('toggles theme when theme button is clicked', () => {
    renderWithProviders(<Header />)
    
    const themeButton = screen.getByRole('button', { name: /theme/i })
    fireEvent.click(themeButton)
    
    expect(document.documentElement).toHaveClass('dark')
  })

  it('shows user menu when logged in', () => {
    // Mock user authentication
    jest.spyOn(require('@/contexts/AuthContext'), 'useAuth').mockReturnValue({
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'candidato',
        createdAt: new Date()
      },
      signOut: jest.fn()
    })

    renderWithProviders(<Header />)
    
    expect(screen.getByText('Perfil')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
  })
}) 