import { IDoctor } from '@/types/database'

export class Doctor implements IDoctor {
  constructor(
    public id: number,
    public nome: string,
    public especialidade: string,
    public crm: string,
  ) {}

  static fromObject(obj: IDoctor): Doctor {
    return new Doctor(obj.id, obj.nome, obj.especialidade, obj.crm)
  }

  toJSON(): IDoctor {
    return {
      id: this.id,
      nome: this.nome,
      especialidade: this.especialidade,
      crm: this.crm,
    }
  }

  validate(): string[] {
    const errors: string[] = []

    if (!this.nome || this.nome.trim().length < 2) {
      errors.push('Nome do médico deve ter pelo menos 2 caracteres')
    }

    if (!this.especialidade || this.especialidade.trim().length < 2) {
      errors.push('Especialidade deve ter pelo menos 2 caracteres')
    }

    if (!this.crm || this.crm.trim().length < 4) {
      errors.push('CRM deve ter pelo menos 4 caracteres')
    }

    return errors
  }
}
