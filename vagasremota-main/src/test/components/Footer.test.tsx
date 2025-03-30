import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Footer } from '@/components/Footer'

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Footer', () => {
  it('renders footer sections', () => {
    renderWithRouter(<Footer />)
    
    expect(screen.getByText('Vagas Remota')).toBeInTheDocument()
    expect(screen.getByText('Links Úteis')).toBeInTheDocument()
    expect(screen.getByText('Para Empresas')).toBeInTheDocument()
    expect(screen.getByText('Redes Sociais')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    renderWithRouter(<Footer />)
    
    const socialLinks = screen.getAllByRole('link')
    expect(socialLinks).toHaveLength(7) // 4 social media + 3 navigation links
  })

  it('renders copyright text', () => {
    renderWithRouter(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Vagas Remota. Todos os direitos reservados.`)).toBeInTheDocument()
  })

  it('renders legal links', () => {
    renderWithRouter(<Footer />)
    
    expect(screen.getByText('Termos de Uso')).toBeInTheDocument()
    expect(screen.getByText('Política de Privacidade')).toBeInTheDocument()
  })
}) 