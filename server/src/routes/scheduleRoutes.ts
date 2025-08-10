import { Router } from 'express'
import { ScheduleController } from '../controllers/ScheduleController'

export class ScheduleRoutes {
  private router = Router()

  constructor(private scheduleController: ScheduleController) {
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // GET /api/schedules - Listar agendamentos com filtros, ordenação e paginação
    this.router.get('/', (req, res) => this.scheduleController.getAllSchedules(req, res))
  }

  getRouter(): Router {
    return this.router
  }
}
