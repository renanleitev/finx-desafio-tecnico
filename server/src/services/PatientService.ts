import { ScheduleRepository } from '../repositories/ScheduleRepository'

export class PatientService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async getAllPatients() {
    try {
      return await this.scheduleRepository.findPatients()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      throw new Error(`Erro ao buscar pacientes: ${errorMessage}`)
    }
  }

  async searchPatients(searchTerm: string) {
    try {
      const allPatients = await this.scheduleRepository.findPatients()
      return allPatients.filter(
        (patient) =>
          patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      throw new Error(`Erro ao buscar pacientes: ${errorMessage}`)
    }
  }
}
