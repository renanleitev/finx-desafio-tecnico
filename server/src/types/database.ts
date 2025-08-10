export interface IDoctor {
  id: number
  nome: string
  especialidade: string
  crm: string
}

export interface IPatient {
  id: number
  nome: string
  dataNascimento: string
  telefone: string
  email: string
}

export interface ISchedule {
  id: number
  medico: IDoctor
  paciente: IPatient
  dataAgendamento: string
  dataCriacao: string
  status: string
  observacoes?: string
}

export interface IFilters {
  medico?: string
  paciente?: string
  dataCriacao?: string
  status?: string
  especialidade?: string
}
