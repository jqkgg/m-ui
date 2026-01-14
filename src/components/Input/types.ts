export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'search'

export interface InputProps {
  type?: InputType
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  error?: boolean
}

