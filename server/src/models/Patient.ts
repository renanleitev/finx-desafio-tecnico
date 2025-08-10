import { IPatient } from '@/types/database'

export class Patient implements IPatient {
  constructor(
    public id: number,
    public nome: string,
    public dataNascimento: string,
    public telefone: string,
    public email: string,
  ) {}

  static fromObject(obj: IPatient): Patient {
    return new Patient(obj.id, obj.nome, obj.dataNascimento, obj.telefone, obj.email)
  }

  toJSON(): IPatient {
    return {
      id: this.id,
      nome: this.nome,
      dataNascimento: this.dataNascimento,
      telefone: this.telefone,
      email: this.email,
    }
  }

  validate(): string[] {
    const errors: string[] = []

    if (!this.nome || this.nome.trim().length < 2) {
      errors.push('Nome do paciente deve ter pelo menos 2 caracteres')
    }

    if (this.email && !this.isValidEmail(this.email)) {
      errors.push('Email inválido')
    }

    if (this.dataNascimento && !this.isValidDate(this.dataNascimento)) {
      errors.push('Data de nascimento inválida')
    }

    if (this.dataNascimento) {
      const dataNasc = new Date(this.dataNascimento)
      const hoje = new Date()

      dataNasc.setHours(0, 0, 0, 0)
      hoje.setHours(0, 0, 0, 0)

      if (dataNasc > hoje) {
        errors.push('Data de nascimento não pode ser no futuro')
      }
    }

    return errors
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date.getTime())
  }

  getAge(): number | null {
    if (!this.dataNascimento) return null

    const birth = new Date(this.dataNascimento)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age
  }
}
