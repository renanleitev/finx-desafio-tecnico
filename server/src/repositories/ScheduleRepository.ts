import { schedulesDB } from '../database/schedules'
import { ISchedule, ICreateSchedule, IUpdateSchedule } from '../types/database'

export class ScheduleRepository {
  private schedules: ISchedule[]
  private nextId: number

  constructor() {
    this.schedules = this.getInitialData()
    this.nextId = Math.max(...this.schedules.map((s) => s.id), 0) + 1
  }

  async findAll(): Promise<ISchedule[]> {
    return Promise.resolve([...this.schedules])
  }

  async findById(id: number): Promise<ISchedule | null> {
    const schedule = this.schedules.find((s) => s.id === id)
    return Promise.resolve(schedule || null)
  }

  async create(data: ICreateSchedule): Promise<ISchedule> {
    const newSchedule: ISchedule = {
      id: this.nextId++,
      medico: {
        id: data.medico.id || this.nextId,
        nome: data.medico.nome,
        especialidade: data.medico.especialidade || '',
        crm: data.medico.crm || '',
      },
      paciente: {
        id: data.paciente.id || this.nextId,
        nome: data.paciente.nome,
        dataNascimento: data.paciente.dataNascimento || '',
        telefone: data.paciente.telefone || '',
        email: data.paciente.email || '',
      },
      dataAgendamento: data.dataAgendamento,
      dataCriacao: new Date().toISOString(),
      status: 'agendado',
      observacoes: data.observacoes || '',
    }

    this.schedules.push(newSchedule)
    return Promise.resolve(newSchedule)
  }

  async update(id: number, data: IUpdateSchedule): Promise<ISchedule | null> {
    const scheduleIndex = this.schedules.findIndex((s) => s.id === id)

    if (scheduleIndex === -1) {
      return Promise.resolve(null)
    }

    const updatedSchedule = {
      ...this.schedules[scheduleIndex],
      ...data,
      id,
    }

    this.schedules[scheduleIndex] = updatedSchedule
    return Promise.resolve(updatedSchedule)
  }

  async delete(id: number): Promise<ISchedule | null> {
    const scheduleIndex = this.schedules.findIndex((s) => s.id === id)

    if (scheduleIndex === -1) {
      return Promise.resolve(null)
    }

    const deletedSchedule = this.schedules.splice(scheduleIndex, 1)[0]
    return Promise.resolve(deletedSchedule)
  }

  async findDoctors(): Promise<ISchedule['medico'][]> {
    const doctorsMap = new Map()

    this.schedules.forEach((schedule) => {
      if (!doctorsMap.has(schedule.medico.id)) {
        doctorsMap.set(schedule.medico.id, schedule.medico)
      }
    })

    return Promise.resolve([...doctorsMap.values()])
  }

  async findPatients(): Promise<ISchedule['paciente'][]> {
    const patientsMap = new Map()

    this.schedules.forEach((schedule) => {
      if (!patientsMap.has(schedule.paciente.id)) {
        patientsMap.set(schedule.paciente.id, schedule.paciente)
      }
    })

    return Promise.resolve([...patientsMap.values()])
  }

  private getInitialData(): ISchedule[] {
    return schedulesDB
  }
}
