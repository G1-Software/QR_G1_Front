import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { HeaderInfoPage } from '../HeaderInfoPage'

// Mock del asset de tu código
vi.mock('../../assets/logotipo.jpg', () => ({
  default: '/mocked-logo.jpg'
}))

// Mock CSS import 
vi.mock('../../styles/index.css', () => ({}))

// Mock useNavigate 
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Test HeaderInfoPage Component', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza exactamente como tu código: header > return-box + logo', () => {
    renderWithRouter(<HeaderInfoPage to="/home" />)
    
    const header = document.querySelector('header')
    const returnBox = document.querySelector('.return-box')
    const logo = screen.getByAltText('Logotipo')
    
    expect(header).toBeInTheDocument()
    expect(returnBox).toBeInTheDocument()
    expect(logo).toHaveClass('logo-header-info-page')
  })

  it('botón arrow_back_ios navega(-1) como tu código', () => {
    renderWithRouter(<HeaderInfoPage to="/test" />)
    
    const backButton = screen.getByText('arrow_back_ios')
    fireEvent.click(backButton)
    
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('Link Home usa template literal ${to} como tu código', () => {
    renderWithRouter(<HeaderInfoPage to="/dashboard" />)
    
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/dashboard')
  })

  it('botón tiene estilos que funcionan en el testing', () => {
    renderWithRouter(<HeaderInfoPage to="/test" />)
    
    const backButton = screen.getByText('arrow_back_ios')
    
    // Verificar que el atributo style existe y contiene estilos
    const styleAttr = backButton.getAttribute('style')
    expect(styleAttr).toContain('background: none')
    expect(styleAttr).toContain('cursor: pointer')
    
    // Verificar que el botón funciona (que es lo más importante)
    expect(backButton.tagName).toBe('BUTTON')
    fireEvent.click(backButton)
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('clases CSS exactas de tu código', () => {
    renderWithRouter(<HeaderInfoPage to="/test" />)
    
    const backButton = screen.getByText('arrow_back_ios')
    const homeLink = screen.getByRole('link')
    const logo = screen.getByAltText('Logotipo')
    
    expect(backButton).toHaveClass('material-symbols-outlined')
    expect(homeLink).toHaveClass('material-symbols-outlined')
    expect(logo).toHaveClass('logo-header-info-page')
  })

  it('importa logo desde assets como tu código', () => {
    renderWithRouter(<HeaderInfoPage to="/test" />)
    
    const logo = screen.getByAltText('Logotipo')
    expect(logo).toHaveAttribute('src', '/mocked-logo.jpg')
  })

  it('estructura HTML: return-box contiene botón y link en orden', () => {
    renderWithRouter(<HeaderInfoPage to="/categories" />)
    
    const returnBox = document.querySelector('.return-box')
    const backButton = screen.getByText('arrow_back_ios')
    const homeLink = screen.getByText('Home')
    
    expect(returnBox.children).toHaveLength(2)
    expect(returnBox.children[0]).toBe(backButton)
    expect(returnBox.children[1]).toBe(homeLink)
  })

  it('prop to funciona con diferentes rutas', () => {
    const { rerender } = renderWithRouter(<HeaderInfoPage to="/admin" />)
    
    let homeLink = screen.getByRole('link')
    expect(homeLink).toHaveAttribute('href', '/admin')
    
    rerender(
      <BrowserRouter>
        <HeaderInfoPage to="/categories" />
      </BrowserRouter>
    )
    
    homeLink = screen.getByRole('link')
    expect(homeLink).toHaveAttribute('href', '/categories')
  })

  it('múltiples clicks en botón funcionan correctamente', () => {
    renderWithRouter(<HeaderInfoPage to="/test" />)
    
    const backButton = screen.getByText('arrow_back_ios')
    
    fireEvent.click(backButton)
    fireEvent.click(backButton)
    
    expect(mockNavigate).toHaveBeenCalledTimes(2)
    expect(mockNavigate).toHaveBeenNthCalledWith(1, -1)
    expect(mockNavigate).toHaveBeenNthCalledWith(2, -1)
  })

  it('botón tiene la funcionalidad correcta independiente de estilos', () => {
    renderWithRouter(<HeaderInfoPage to="/test" />)
    
    const backButton = screen.getByText('arrow_back_ios')
    
    // Verificar que es un botón HTML
    expect(backButton.tagName).toBe('BUTTON')
    
    // Verificar que tiene la clase correcta
    expect(backButton).toHaveClass('material-symbols-outlined')
    
    // Verificar que funciona al hacer click
    fireEvent.click(backButton)
    expect(mockNavigate).toHaveBeenCalledWith(-1)
    
    // Verificar que contiene el texto correcto
    expect(backButton).toHaveTextContent('arrow_back_ios')
  })

  it('header contiene exactamente 2 elementos hijos', () => {
    renderWithRouter(<HeaderInfoPage to="/admin" />)
    
    const header = document.querySelector('header')
    const returnBox = document.querySelector('.return-box')
    const logo = document.querySelector('.logo-header-info-page')
    
    expect(header.children).toHaveLength(2)
    expect(header.children[0]).toBe(returnBox)
    expect(header.children[1]).toBe(logo)
  })

  it('verifica que el componente renderiza sin errores', () => {
    expect(() => {
      renderWithRouter(<HeaderInfoPage to="/test" />)
    }).not.toThrow()
  })

  it('verifica export de tu componente real', () => {
    expect(HeaderInfoPage).toBeDefined()
    expect(typeof HeaderInfoPage).toBe('function')
  })
})