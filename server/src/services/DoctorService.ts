import { ScheduleRepository } from '../repositories/ScheduleRepository'

export class DoctorService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async getAllDoctors() {
    try {
      return await this.scheduleRepository.findDoctors()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      throw new Error(`Erro ao buscar médicos: ${errorMessage}`)
    }
  }

  async getDoctorBySpecialty(specialty: string) {
    try {
      const allDoctors = await this.scheduleRepository.findDoctors()
      return allDoctors.filter((doctor) =>
        doctor.especialidade.toLowerCase().includes(specialty.toLowerCase()),
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      throw new Error(`Erro ao buscar médicos por especialidade: ${errorMessage}`)
    }
  }
}
