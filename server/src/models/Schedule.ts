import { ISchedule } from '@/types/database'
import { Doctor } from './Doctor'
import { Patient } from './Patient'

export class Schedule implements ISchedule {
  constructor(
    public id: number,
    public medico: Doctor,
    public paciente: Patient,
    public dataAgendamento: string,
    public dataCriacao: string,
    public status: string,
    public observacoes: string,
  ) {}

  static fromObject(obj: ISchedule): Schedule {
    return new Schedule(
      obj.id,
      Doctor.fromObject(obj.medico),
      Patient.fromObject(obj.paciente),
      obj.dataAgendamento,
      obj.dataCriacao,
      obj.status,
      obj?.observacoes ?? '',
    )
  }

  toJSON(): ISchedule {
    return {
      id: this.id,
      medico: this.medico.toJSON(),
      paciente: this.paciente.toJSON(),
      dataAgendamento: this.dataAgendamento,
      dataCriacao: this.dataCriacao,
      status: this.status,
      observacoes: this.observacoes,
    }
  }

  validate(): string[] {
    const errors: string[] = []

    // Validar médico
    const medicoErrors = this.medico.validate()
    errors.push(...medicoErrors.map((err) => `Médico: ${err}`))

    // Validar paciente
    const pacienteErrors = this.paciente.validate()
    errors.push(...pacienteErrors.map((err) => `Paciente: ${err}`))

    // Validar data de agendamento
    if (!this.dataAgendamento) {
      errors.push('Data de agendamento é obrigatória')
    } else {
      const agendamentoDate = new Date(this.dataAgendamento)
      if (isNaN(agendamentoDate.getTime())) {
        errors.push('Data de agendamento inválida')
      } else if (agendamentoDate < new Date()) {
        errors.push('Data de agendamento não pode ser no passado')
      }
    }

    // Validar status
    const validStatuses: string[] = ['agendado', 'confirmado', 'cancelado', 'concluido', ]
    if (!validStatuses.includes(this.status)) {
      errors.push('Status inválido')
    }

    return errors
  }

  isInPast(): boolean {
    return new Date(this.dataAgendamento) < new Date()
  }

  canBeCancelled(): boolean {
    return this.status !== 'cancelado' && !this.isInPast()
  }

  canBeConfirmed(): boolean {
    return this.status === 'agendado' && !this.isInPast()
  }

  getTimeDifferenceFromNow(): string {
    const now = new Date()
    const appointment = new Date(this.dataAgendamento)
    const diff = appointment.getTime() - now.getTime()

    if (diff < 0) return 'Já passou'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days} dia(s)`
    if (hours > 0) return `${hours} hora(s)`

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${minutes} minuto(s)`
  }
}
