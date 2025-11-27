import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from '../Input' 

describe('Input Component - Tests del Componente', () => {
  it('renderiza un input con label correctamente', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        label="Nombre de usuario" 
        value="" 
        onChange={handleChange} 
      />
    )
    
    // Verifica la estructura principal
    const container = document.querySelector('.form-field-container')
    expect(container).toBeInTheDocument()
    
    // Verifica el label
    const label = screen.getByText('Nombre de usuario')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('form-field-label')
    
    // Verifica el input
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('form-field-input')
    expect(input).toHaveAttribute('required')
  })

  it('renderiza como textarea cuando textarea=true', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        label="Descripción" 
        value="" 
        onChange={handleChange} 
        textarea={true}
      />
    )
    
    // Verifica que es un textarea, no un input
    const textarea = screen.getByRole('textbox')
    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).toHaveClass('form-field-input', 'textarea')
    expect(textarea).toHaveAttribute('required')
  })

  it('aplica diferentes tipos de input', () => {
    const handleChange = vi.fn()
    const { rerender } = render(
      <Input 
        label="Email" 
        type="email" 
        value="" 
        onChange={handleChange} 
      />
    )
    
    let input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
    
    rerender(
      <Input 
        label="Password" 
        type="password" 
        value="" 
        onChange={handleChange} 
      />
    )
    
    // Para password, no es textbox, es un campo de password
    const passwordInput = document.querySelector('input[type="password"]')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('usa tipo "text" por defecto', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        label="Campo por defecto" 
        value="" 
        onChange={handleChange} 
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('maneja cambios de valor en input', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        label="Test Input" 
        value="" 
        onChange={handleChange} 
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'nuevo valor' } })
    
    expect(handleChange).toHaveBeenCalledWith('nuevo valor')
  })

  it('maneja cambios de valor en textarea', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        label="Test Textarea" 
        value="" 
        onChange={handleChange} 
        textarea={true}
      />
    )
    
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'texto largo\ncon saltos de línea' } })
    
    expect(handleChange).toHaveBeenCalledWith('texto largo\ncon saltos de línea')
  })

  it('muestra el valor actual del input', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        label="Input con valor" 
        value="Valor inicial" 
        onChange={handleChange} 
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input.value).toBe('Valor inicial')
  })

  it('muestra el valor actual del textarea', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        label="Textarea con valor" 
        value="Contenido del textarea" 
        onChange={handleChange} 
        textarea={true}
      />
    )
    
    const textarea = screen.getByRole('textbox')
    expect(textarea.value).toBe('Contenido del textarea')
  })

  it('tiene la estructura HTML correcta para input', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        label="Test Structure" 
        value="" 
        onChange={handleChange} 
      />
    )
    
    const container = document.querySelector('.form-field-container')
    const label = document.querySelector('.form-field-label')
    const input = document.querySelector('.form-field-input')
    
    expect(container).toBeInTheDocument()
    expect(container).toContainElement(label)
    expect(container).toContainElement(input)
    expect(input.tagName).toBe('INPUT')
  })

  it('tiene la estructura HTML correcta para textarea', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        label="Test Structure Textarea" 
        value="" 
        onChange={handleChange} 
        textarea={true}
      />
    )
    
    const container = document.querySelector('.form-field-container')
    const label = document.querySelector('.form-field-label')
    const textarea = document.querySelector('.form-field-input.textarea')
    
    expect(container).toBeInTheDocument()
    expect(container).toContainElement(label)
    expect(container).toContainElement(textarea)
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('todos los inputs tienen atributo required', () => {
    const handleChange = vi.fn()
    const { rerender } = render(
      <Input 
        label="Required Input" 
        value="" 
        onChange={handleChange} 
      />
    )
    
    let input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('required')
    
    rerender(
      <Input 
        label="Required Textarea" 
        value="" 
        onChange={handleChange} 
        textarea={true}
      />
    )
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('required')
  })

  it('funciona con diferentes tipos de datos en onChange', () => {
    let capturedValue
    const handleChange = (value) => {
      capturedValue = value
    }
    
    render(
      <Input 
        label="Test onChange" 
        value="" 
        onChange={handleChange} 
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test123' } })
    
    expect(capturedValue).toBe('test123')
    expect(typeof capturedValue).toBe('string')
  })

  it('verifica que el componente se exporta correctamente', () => {
    expect(Input).toBeDefined()
    expect(typeof Input).toBe('function')
  })

  it('renderiza múltiples inputs sin conflictos', () => {
    const handleChange1 = vi.fn()
    const handleChange2 = vi.fn()
    
    render(
      <div>
        <Input 
          label="Input 1" 
          value="valor1" 
          onChange={handleChange1} 
        />
        <Input 
          label="Input 2" 
          value="valor2" 
          onChange={handleChange2} 
          type="email"
        />
      </div>
    )
    
    expect(screen.getByText('Input 1')).toBeInTheDocument()
    expect(screen.getByText('Input 2')).toBeInTheDocument()
    
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)
    expect(inputs[0].value).toBe('valor1')
    expect(inputs[1].value).toBe('valor2')
    expect(inputs[1]).toHaveAttribute('type', 'email')
  })
})