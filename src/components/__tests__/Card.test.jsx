import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Card from '../Card' 

// Mock CSS import
vi.mock('../../styles/Card.css', () => ({}))

// Wrapper para componentes que usan React Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Card Component - Tests del Componente ', () => {
  const defaultProps = {
    image: '/test-image.jpg',
    title: 'Título de Prueba',
    description: 'Descripción de prueba para el card',
    linkText: 'Ver más',
    linkHref: '/test-route'
  }

  it('renderiza el card con todas las props correctas', () => {
    renderWithRouter(<Card {...defaultProps} />)
    
    // Verifica la estructura principal
    const cardContainer = document.querySelector('.card')
    expect(cardContainer).toBeInTheDocument()
    
    // Verifica la imagen
    const image = screen.getByAltText('Título de Prueba')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    
    // Verifica el título
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Título de Prueba')
    
    // Verifica la descripción
    expect(screen.getByText('Descripción de prueba para el card')).toBeInTheDocument()
    
    // Verifica el link
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test-route')
    expect(link).toHaveTextContent('Ver más')
    expect(link).toHaveClass('button')
  })

  it('renderiza la imagen con alt text correcto', () => {
    renderWithRouter(<Card {...defaultProps} title="Mi Título Especial" />)
    
    const image = screen.getByAltText('Mi Título Especial')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('renderiza el título como h2', () => {
    renderWithRouter(<Card {...defaultProps} title="Título H2" />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Título H2')
    expect(heading.tagName).toBe('H2')
  })

  it('renderiza la descripción en párrafo', () => {
    renderWithRouter(<Card {...defaultProps} description="Mi descripción única" />)
    
    const paragraph = screen.getByText('Mi descripción única')
    expect(paragraph.tagName).toBe('P')
  })

  it('el link de navegación funciona correctamente', () => {
    renderWithRouter(<Card {...defaultProps} linkText="Ir al Dashboard" linkHref="/dashboard" />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/dashboard')
    expect(link).toHaveTextContent('Ir al Dashboard')
    expect(link).toHaveClass('button')
  })

  it('incluye el icono de flecha en el link', () => {
    renderWithRouter(<Card {...defaultProps} />)
    
    const iconSpan = document.querySelector('.material-symbols-outlined')
    expect(iconSpan).toBeInTheDocument()
    expect(iconSpan).toHaveTextContent('arrow_right_alt')
    
    // Verifica que el icono está dentro del link
    const link = screen.getByRole('link')
    expect(link).toContainElement(iconSpan)
  })

  it('tiene la estructura HTML correcta', () => {
    renderWithRouter(<Card {...defaultProps} />)
    
    // Verifica la estructura: div.card > img + div.card-content
    const cardDiv = document.querySelector('.card')
    const cardContent = document.querySelector('.card-content')
    const image = document.querySelector('.card img')
    
    expect(cardDiv).toBeInTheDocument()
    expect(cardContent).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    
    // Verifica que card-content está dentro de card
    expect(cardDiv).toContainElement(cardContent)
    expect(cardDiv).toContainElement(image)
  })

  it('maneja diferentes tipos de contenido', () => {
    renderWithRouter(
      <Card 
        image="/otra-imagen.png"
        title="Card con Emojis 🚀"
        description="Descripción con números 123 y símbolos @#$"
        linkText="¡Acceder ahora!"
        linkHref="/acceso-especial"
      />
    )
    
    expect(screen.getByAltText('Card con Emojis 🚀')).toHaveAttribute('src', '/otra-imagen.png')
    expect(screen.getByText('Card con Emojis 🚀')).toBeInTheDocument()
    expect(screen.getByText('Descripción con números 123 y símbolos @#$')).toBeInTheDocument()
    expect(screen.getByText('¡Acceder ahora!')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/acceso-especial')
  })

  it('renderiza múltiples cards sin conflictos', () => {
    renderWithRouter(
      <div>
        <Card 
          image="/card1.jpg"
          title="Card 1"
          description="Descripción 1"
          linkText="Link 1"
          linkHref="/ruta1"
        />
        <Card 
          image="/card2.jpg"
          title="Card 2"
          description="Descripción 2"
          linkText="Link 2"
          linkHref="/ruta2"
        />
      </div>
    )
    
    expect(screen.getByText('Card 1')).toBeInTheDocument()
    expect(screen.getByText('Card 2')).toBeInTheDocument()
    expect(screen.getByText('Link 1')).toBeInTheDocument()
    expect(screen.getByText('Link 2')).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/ruta1')
    expect(links[1]).toHaveAttribute('href', '/ruta2')
  })

  it('verifica que el componente se exporta correctamente', () => {
    expect(Card).toBeDefined()
    expect(typeof Card).toBe('function')
  })

  it('maneja props vacías o undefined sin crashear', () => {
    expect(() => {
      renderWithRouter(<Card />)
    }).not.toThrow()
    
    const cardElement = document.querySelector('.card')
    expect(cardElement).toBeInTheDocument()
  })
})