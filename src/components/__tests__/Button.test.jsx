import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi} from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Button } from '../Button'

// Mock CSS import
vi.mock('../../styles/index.css', () => ({}))

// Wrapper para componentes que usan React Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Button Component - Tests del Componente', () => {
  it('renderiza como un link con texto usando prop text', () => {
    renderWithRouter(<Button text="Botón de Prueba" to="/test" />)
    
    const linkElement = screen.getByRole('link')
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveClass('button')
    expect(linkElement).toHaveTextContent('Botón de Prueba')
  })

  it('aplica la clase purple por defecto (isCategoryPage=false)', () => {
    renderWithRouter(<Button text="Test Button" to="/test" />)
    
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveClass('button', 'purple')
  })

  it('aplica la clase blue cuando isCategoryPage=true', () => {
    renderWithRouter(<Button text="Category Button" to="/category" isCategoryPage={true} />)
    
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveClass('button', 'blue')
    expect(linkElement).not.toHaveClass('purple')
  })

  it('maneja navegación con prop "to"', () => {
    renderWithRouter(<Button text="Ir a Dashboard" to="/dashboard" />)
    
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', '/dashboard')
    expect(linkElement).toHaveTextContent('Ir a Dashboard')
  })

  it('funciona con diferentes rutas', () => {
    const { rerender } = renderWithRouter(<Button text="Admin" to="/admin" />)
    
    let linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', '/admin')
    expect(linkElement).toHaveTextContent('Admin')
    
    rerender(
      <BrowserRouter>
        <Button text="Settings" to="/settings" />
      </BrowserRouter>
    )
    
    linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', '/settings')
    expect(linkElement).toHaveTextContent('Settings')
  })

  it('combina correctamente las clases según isCategoryPage', () => {
    const { rerender } = renderWithRouter(
      <Button text="Normal Button" to="/normal" isCategoryPage={false} />
    )
    
    let linkElement = screen.getByRole('link')
    expect(linkElement.className).toBe('button purple')
    
    rerender(
      <BrowserRouter>
        <Button text="Category Button" to="/category" isCategoryPage={true} />
      </BrowserRouter>
    )
    
    linkElement = screen.getByRole('link')
    expect(linkElement.className).toBe('button blue')
  })

  it('renderiza texto vacío si no se proporciona prop text', () => {
    renderWithRouter(<Button to="/empty" />)
    
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveTextContent('')
    expect(linkElement).toHaveAttribute('href', '/empty')
  })

  it('maneja valores undefined para isCategoryPage (usa default false)', () => {
    renderWithRouter(<Button text="Default Style" to="/default" />)
    
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveClass('button', 'purple') // Default es false = purple
  })

  it('estructura del componente es exactamente un Link con las props correctas', () => {
    renderWithRouter(<Button text="Test Component" to="/component-test" isCategoryPage={false} />)
    
    const linkElement = screen.getByRole('link')
    
    // Verifica que es exactamente lo que tu componente genera
    expect(linkElement.tagName).toBe('A')
    expect(linkElement.getAttribute('href')).toBe('/component-test')
    expect(linkElement.getAttribute('class')).toBe('button purple')
    expect(linkElement.textContent).toBe('Test Component')
  })

  it('verifica que el componente exporta correctamente', () => {
    expect(Button).toBeDefined()
    expect(typeof Button).toBe('function')
  })
})