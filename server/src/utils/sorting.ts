import { ISchedule } from '@/types/database'
import { ISortParams } from '@/types/api'

export class SortUtils {
  static applySort(data: ISchedule[], sortParams: ISortParams): ISchedule[] {
    const { sortBy, sortOrder = 'desc' } = sortParams

    if (!sortBy) return data

    return [...data].sort((a, b) => {
      let valueA
      let valueB

      switch (sortBy) {
        case 'dataCriacao':
          valueA = new Date(a.dataCriacao).getTime()
          valueB = new Date(b.dataCriacao).getTime()
          break
        case 'dataAgendamento':
          valueA = new Date(a.dataAgendamento).getTime()
          valueB = new Date(b.dataAgendamento).getTime()
          break
        case 'medico':
          valueA = a.medico.nome.toLowerCase()
          valueB = b.medico.nome.toLowerCase()
          break
        case 'paciente':
          valueA = a.paciente.nome.toLowerCase()
          valueB = b.paciente.nome.toLowerCase()
          break
        case 'status':
          valueA = a.status.toLowerCase()
          valueB = b.status.toLowerCase()
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0
      }
    })
  }

  static getAvailableSortFields(): string[] {
    return ['dataCriacao', 'dataAgendamento', 'medico', 'paciente', 'status']
  }

  static isValidSortField(field: string): boolean {
    return this.getAvailableSortFields().includes(field)
  }

  static isValidSortOrder(order: string): boolean {
    return ['asc', 'desc'].includes(order)
  }
}
