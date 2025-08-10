import { ISchedule, IFilters } from '@/types/database'

export class FilterUtils {
  static applyFilters(data: ISchedule[], filters: IFilters): ISchedule[] {
    let filteredData = [...data]

    // Filtro por nome do médico
    if (filters.medico) {
      filteredData = filteredData.filter((item) =>
        item.medico.nome.toLowerCase().includes(filters.medico!.toLowerCase()),
      )
    }

    // Filtro por nome do paciente
    if (filters.paciente) {
      filteredData = filteredData.filter((item) =>
        item.paciente.nome.toLowerCase().includes(filters.paciente!.toLowerCase()),
      )
    }

    // Filtro por data de criação
    if (filters.dataCriacao) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.dataCriacao).toISOString().split('T')[0]
        return itemDate === filters.dataCriacao
      })
    }

    // Filtro por status
    if (filters.status) {
      filteredData = filteredData.filter(
        (item) => item.status.toLowerCase() === filters.status!.toLowerCase(),
      )
    }

    // Filtro por especialidade do médico
    if (filters.especialidade) {
      filteredData = filteredData.filter((item) =>
        item.medico.especialidade.toLowerCase().includes(filters.especialidade!.toLowerCase()),
      )
    }

    return filteredData
  }

  static getAvailableFilters(): string[] {
    return ['medico', 'paciente', 'dataCriacao', 'status', 'especialidade']
  }

  static getAppliedFilters(filters: IFilters): string[] {
    return Object.keys(filters).filter((key) => {
      const value = filters[key as keyof IFilters]
      return value !== undefined && value !== null && value.trim() !== ''
    })
  }
}
