import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Vagas Remota
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className="hover:text-primary">
              Vagas
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="hover:text-primary">
                  Perfil
                </Link>
                <button
                  onClick={signOut}
                  className="hover:text-primary"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary">
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                >
                  Cadastrar
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <Link
              to="/jobs"
              className="block hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Vagas
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Perfil
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                  className="block hover:text-primary"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </>
            )}

            <button
              onClick={() => {
                toggleTheme()
                setIsMenuOpen(false)
              }}
              className="p-2 rounded-md hover:bg-accent"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
