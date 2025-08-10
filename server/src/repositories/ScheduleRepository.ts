import { schedulesDB } from '../database/schedules'
import { ISchedule } from '../types/database'

export class ScheduleRepository {
  private schedules: ISchedule[]

  constructor() {
    this.schedules = this.getInitialData()
  }

  async findAll(): Promise<ISchedule[]> {
    return Promise.resolve([...this.schedules])
  }

  async findById(id: number): Promise<ISchedule | null> {
    const schedule = this.schedules.find((s) => s.id === id)
    return Promise.resolve(schedule || null)
  }

  private getInitialData(): ISchedule[] {
    return schedulesDB
  }
}
