import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import { AdminNavbar } from '../AdminNavbar' 

// Mock Auth0
vi.mock('@auth0/auth0-react')

// Mock CSS import
vi.mock('../styles/adminHome.css', () => ({}))

// Mock logo import
vi.mock('../assets/logotipo.jpg', () => ({
  default: '/mocked-logo.jpg'
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('AdminNavbar - Real Component Tests', () => {
  const mockLogout = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useAuth0.mockReturnValue({
      logout: mockLogout
    })
  })

  it('renders the AdminNavbar component', () => {
    renderWithRouter(<AdminNavbar />)
    
    // Verifica que el layout principal existe
    expect(document.querySelector('.admin-layout')).toBeInTheDocument()
  })

  it('renders sidebar in closed state by default', () => {
    renderWithRouter(<AdminNavbar />)
    
    // El sidebar debe estar cerrado inicialmente
    const sidebar = document.querySelector('.sidebar')
    expect(sidebar).toHaveClass('close')
    expect(sidebar).not.toHaveClass('open')
  })

  it('renders all navigation links', () => {
    renderWithRouter(<AdminNavbar />)
    
    // Verifica todos los links de navegación
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Editor')).toBeInTheDocument()
    expect(screen.getByText('Instructivo')).toBeInTheDocument()
    expect(screen.getByText('Listado de solicitudes')).toBeInTheDocument()
    expect(screen.getByText('Dashboard de solicitudes')).toBeInTheDocument()
    expect(screen.getByText('Dashboard de métricas QR')).toBeInTheDocument()
    expect(screen.getByText('Dashboard de métricas Chatbot')).toBeInTheDocument()
  })

  it('toggles sidebar when menu button is clicked', () => {
    renderWithRouter(<AdminNavbar />)
    
    const sidebar = document.querySelector('.sidebar')
    const menuButton = screen.getByText('menu')
    
    // Estado inicial: cerrado
    expect(sidebar).toHaveClass('close')
    
    // Hace click para abrir
    fireEvent.click(menuButton)
    expect(sidebar).toHaveClass('open')
    expect(sidebar).not.toHaveClass('close')
    
    // Hace click para cerrar
    fireEvent.click(menuButton)
    expect(sidebar).toHaveClass('close')
    expect(sidebar).not.toHaveClass('open')
  })

  it('closes sidebar when close button is clicked', () => {
    renderWithRouter(<AdminNavbar />)
    
    const sidebar = document.querySelector('.sidebar')
    const menuButton = screen.getByText('menu')
    const closeButton = screen.getByText('close')
    
    // Abre el sidebar primero
    fireEvent.click(menuButton)
    expect(sidebar).toHaveClass('open')
    
    // Cierra con el botón close
    fireEvent.click(closeButton)
    expect(sidebar).toHaveClass('close')
  })

  it('closes sidebar when a navigation link is clicked', () => {
    renderWithRouter(<AdminNavbar />)
    
    const sidebar = document.querySelector('.sidebar')
    const menuButton = screen.getByText('menu')
    
    // Abre el sidebar
    fireEvent.click(menuButton)
    expect(sidebar).toHaveClass('open')
    
    // Click en un link
    const editorLink = screen.getByText('Editor')
    fireEvent.click(editorLink)
    
    // El sidebar debe cerrarse
    expect(sidebar).toHaveClass('close')
  })

  it('renders logout button and calls logout function', () => {
    renderWithRouter(<AdminNavbar />)
    
    const logoutButton = screen.getByText('Cerrar sesión')
    expect(logoutButton).toBeInTheDocument()
    
    // Click en logout
    fireEvent.click(logoutButton)
    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.href }
    })
  })

  it('renders brand logo with correct attributes', () => {
    renderWithRouter(<AdminNavbar />)
    
    const logo = screen.getByAltText('UC CHRISTUS')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveClass('brand__logo')
  })

  it('has correct navigation link paths', () => {
    renderWithRouter(<AdminNavbar />)
    
    // Verifica que los links tienen las rutas correctas
    expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/admin')
    expect(screen.getByText('Editor').closest('a')).toHaveAttribute('href', '/admin/editor')
    expect(screen.getByText('Instructivo').closest('a')).toHaveAttribute('href', '/admin/instructivo')
  })

  it('renders header with correct structure', () => {
    renderWithRouter(<AdminNavbar />)
    
    // Verifica la estructura del header
    expect(document.querySelector('.admin-header')).toBeInTheDocument()
    expect(document.querySelector('.admin-header__inner')).toBeInTheDocument()
    expect(document.querySelector('.header-left')).toBeInTheDocument()
    expect(document.querySelector('.logout-container')).toBeInTheDocument()
  })
})