
/*
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

describe('Test del componente AdminNavBar', () => {
  const mockLogout = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useAuth0.mockReturnValue({
      logout: mockLogout
    })
  })

  it('renderiza el componente AdminNavbar', () => {
    renderWithRouter(<AdminNavbar />)
    
    // Verifica que el layout principal existe
    expect(document.querySelector('.admin-layout')).toBeInTheDocument()
  })

  it('renderiza el sidebar en estado cerrado por defecto', () => {
    renderWithRouter(<AdminNavbar />)
    
    // El sidebar debe estar cerrado inicialmente
    const sidebar = document.querySelector('.sidebar')
    expect(sidebar).toHaveClass('close')
    expect(sidebar).not.toHaveClass('open')
  })

  it('renderiza todos los enlaces de navegación', () => {
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

  it('cambia el estado del sidebar cuando se hace click en el botón de menú', () => {
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

  it('cierra el sidebar cuando se hace click en el botón de cerrar', () => {
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

  it('cierra el sidebar cuando se hace click en un enlace de navegación', () => {
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

  it('renderiza el botón de cerrar sesión y llama a la función de logout', () => {
    renderWithRouter(<AdminNavbar />)
    
    const logoutButton = screen.getByText('Cerrar sesión')
    expect(logoutButton).toBeInTheDocument()
    
    // se hace click en logout
    fireEvent.click(logoutButton)
    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.href }
    })
  })

  it('renderiza el logo con los atributos correctos', () => {
    renderWithRouter(<AdminNavbar />)
    
    const logo = screen.getByAltText('UC CHRISTUS')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveClass('brand__logo')
  })

  it('tiene las rutas correctas en los links', () => {
    renderWithRouter(<AdminNavbar />)
    
    // Verifica que los links tienen las rutas correctas
    expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/admin')
    expect(screen.getByText('Editor').closest('a')).toHaveAttribute('href', '/admin/editor')
    expect(screen.getByText('Instructivo').closest('a')).toHaveAttribute('href', '/admin/instructivo')
  })

  it('renderiza el header con la estructura correcta', () => {
    renderWithRouter(<AdminNavbar />)
    
    // Verifica la estructura del header
    expect(document.querySelector('.admin-header')).toBeInTheDocument()
    expect(document.querySelector('.admin-header__inner')).toBeInTheDocument()
    expect(document.querySelector('.header-left')).toBeInTheDocument()
    expect(document.querySelector('.logout-container')).toBeInTheDocument()
  })
})
*/