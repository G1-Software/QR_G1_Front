import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth0 } from '@auth0/auth0-react'
import { MemoryRouter } from 'react-router-dom'

// Diferentes tipos de import para probar
let AdminHome

// Mock Auth0
vi.mock('@auth0/auth0-react')

// Mock CSS imports (diferentes rutas posibles)
vi.mock('../styles/adminHome.css', () => ({}))
vi.mock('../../styles/adminHome.css', () => ({}))

// Mock assets (diferentes rutas posibles)
vi.mock('../assets/logotipo.jpg', () => ({
  default: '/mocked-logo.jpg'
}))
vi.mock('../../assets/logotipo.jpg', () => ({
  default: '/mocked-logo.jpg'
}))

const renderWithRouter = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

describe('AdminHome - Functionality Tests', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    
    // Import the real component
    const module = await import('../AdminHome')
    AdminHome = module.default || module.AdminHome || Object.values(module)[0]
  })

  it('muestra el título principal del panel de administración', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
      isLoading: false,
      logout: vi.fn()
    })

    renderWithRouter(<AdminHome />)
    
    // Prueba el contenido REAL de tu componente
    expect(screen.getByText('Panel de Administración QR UC CHRISTUS')).toBeInTheDocument()
  })

  it('muestra las 6 tarjetas de opciones del dashboard', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
      isLoading: false,
      logout: vi.fn()
    })

    renderWithRouter(<AdminHome />)
    
    // Verifica las 6 cards reales
    expect(screen.getByText('Editor de Contenido')).toBeInTheDocument()
    expect(screen.getByText('Instructivo del Editor')).toBeInTheDocument()
    expect(screen.getByText('Listado de Solicitudes')).toBeInTheDocument()
    expect(screen.getByText('Dashboard de Solicitudes')).toBeInTheDocument()
    expect(screen.getByText('Dashboard de métricas QR')).toBeInTheDocument()
    expect(screen.getByText('Dashboard de métricas Chatbot')).toBeInTheDocument()
  })

  it('verifica que los link de navegación funcionan correctamente', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
      isLoading: false,
      logout: vi.fn()
    })

    renderWithRouter(<AdminHome />)
    
    // Verifica los links reales
    const links = screen.getAllByText('Acceder')
    expect(links).toHaveLength(6) // Tus 6 cards deben tener "Acceder"
    
    // Verifica que los links tienen las rutas correctas
    const editorCard = screen.getByText('Editor de Contenido').closest('.card')
    const editorLink = editorCard.querySelector('a')
    expect(editorLink).toHaveAttribute('href', '/admin/editor')
  })

  it('prueba que el botón de cerrar sesión funciona correctamente', async () => {
    const mockLogout = vi.fn()
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
      isLoading: false,
      logout: mockLogout
    })

    renderWithRouter(<AdminHome />)
    
    // Prueba el logout real
    const logoutButton = screen.getByText('Cerrar sesión')
    fireEvent.click(logoutButton)
    
    expect(mockLogout).toHaveBeenCalled()
  })

  it('verifica que las imágenes de las tarjetas tienen textos alternativos correctos', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
      isLoading: false,
      logout: vi.fn()
    })

    renderWithRouter(<AdminHome />)
    
    // Verifica las imágenes reales de tus cards
    expect(screen.getByAltText('Editor de Contenido')).toBeInTheDocument()
    expect(screen.getByAltText('Instructivo del Editor')).toBeInTheDocument()
    expect(screen.getByAltText('Listado de Solicitudes')).toBeInTheDocument()
  })

  it('muestra el mensaje de bienvenida y las instrucciones para el usuario', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
      isLoading: false,
      logout: vi.fn()
    })

    renderWithRouter(<AdminHome />)
    
    // Verifica el mensaje de bienvenida real
    expect(screen.getByText(/Bienvenido al panel de gestión/)).toBeInTheDocument()
    expect(screen.getByText(/Seleccione una opción para continuar/)).toBeInTheDocument()
  })
})