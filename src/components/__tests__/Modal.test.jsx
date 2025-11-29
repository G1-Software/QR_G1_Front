import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from '../Modal' 

describe('Modal Component - Tests del Componente', () => {
  it('renderiza cuando isOpen es true', () => {
    const handleClose = vi.fn()
    render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message="Este es un mensaje de prueba"
      />
    )
    
    // Verifica la estructura principal
    const modalOverlay = document.querySelector('.modal-overlay')
    expect(modalOverlay).toBeInTheDocument()
    
    const modalContent = document.querySelector('.modal-content')
    expect(modalContent).toBeInTheDocument()
    
    // Verifica que el overlay contiene el content
    expect(modalOverlay).toContainElement(modalContent)
  })

  it('no se renderiza cuando isOpen es false', () => {
    const handleClose = vi.fn()
    const { container } = render(
      <Modal 
        isOpen={false} 
        onClose={handleClose} 
        message="No se debe ver"
      />
    )
    
    // Verifica que no hay nada renderizado
    expect(container.firstChild).toBeNull()
    expect(document.querySelector('.modal-overlay')).not.toBeInTheDocument()
  })

  it('muestra el mensaje en un h3', () => {
    const handleClose = vi.fn()
    render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message="Mensaje importante del modal"
      />
    )
    
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Mensaje importante del modal')
  })

  it('llama onClose cuando se hace click en el botón Cerrar', () => {
    const handleClose = vi.fn()
    render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message="Modal con botón"
      />
    )
    
    const closeButton = screen.getByRole('button', { name: 'Cerrar' })
    expect(closeButton).toBeInTheDocument()
    
    fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('tiene la estructura HTML correcta', () => {
    const handleClose = vi.fn()
    render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message="Test estructura"
      />
    )
    
    // Verifica la jerarquía: overlay > content > (h3 + actions > button)
    const overlay = document.querySelector('.modal-overlay')
    const content = document.querySelector('.modal-content')
    const actions = document.querySelector('.modal-actions')
    const heading = document.querySelector('h3')
    const button = document.querySelector('button')
    
    expect(overlay).toContainElement(content)
    expect(content).toContainElement(heading)
    expect(content).toContainElement(actions)
    expect(actions).toContainElement(button)
  })

  it('el botón tiene la estructura correcta', () => {
    const handleClose = vi.fn()
    render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message="Test botón"
      />
    )
    
    const actionsDiv = document.querySelector('.modal-actions')
    const closeButton = screen.getByRole('button')
    
    expect(actionsDiv).toBeInTheDocument()
    expect(actionsDiv).toContainElement(closeButton)
    expect(closeButton).toHaveTextContent('Cerrar')
  })

  it('maneja diferentes tipos de mensajes', () => {
    const handleClose = vi.fn()
    const { rerender } = render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message="Mensaje simple"
      />
    )
    
    let heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('Mensaje simple')
    
    rerender(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message="Mensaje largo con emojis 🚀 y números 123"
      />
    )
    
    heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('Mensaje largo con emojis 🚀 y números 123')
  })

  it('maneja mensaje vacío o undefined', () => {
    const handleClose = vi.fn()
    const { rerender } = render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message=""
      />
    )
    
    let heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('')
    
    rerender(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message={undefined}
      />
    )
    
    heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument() // Existe pero sin contenido
  })

  it('puede abrirse y cerrarse múltiples veces', () => {
    const handleClose = vi.fn()
    const { rerender } = render(
      <Modal 
        isOpen={false} 
        onClose={handleClose} 
        message="Test toggle"
      />
    )
    
    // Inicialmente cerrado
    expect(document.querySelector('.modal-overlay')).not.toBeInTheDocument()
    
    // Abrirlo
    rerender(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message="Test toggle"
      />
    )
    
    expect(document.querySelector('.modal-overlay')).toBeInTheDocument()
    
    // Cerrarlo
    rerender(
      <Modal 
        isOpen={false} 
        onClose={handleClose} 
        message="Test toggle"
      />
    )
    
    expect(document.querySelector('.modal-overlay')).not.toBeInTheDocument()
  })

  it('múltiples clicks en el botón llaman múltiples veces a onClose', () => {
    const handleClose = vi.fn()
    render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        message="Test múltiples clicks"
      />
    )
    
    const closeButton = screen.getByRole('button')
    
    fireEvent.click(closeButton)
    fireEvent.click(closeButton)
    fireEvent.click(closeButton)
    
    expect(handleClose).toHaveBeenCalledTimes(3)
  })

  it('verifica que el componente se exporta correctamente', () => {
    expect(Modal).toBeDefined()
    expect(typeof Modal).toBe('function')
  })

  it('el componente devuelve null cuando está cerrado', () => {
    const handleClose = vi.fn()
    const result = render(
      <Modal 
        isOpen={false} 
        onClose={handleClose} 
        message="No renderizado"
      />
    )
    
    // Verifica que el container está vacío
    expect(result.container.innerHTML).toBe('')
    expect(result.container.firstChild).toBeNull()
  })
})