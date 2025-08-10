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

    // GET /api/schedules/:id - Buscar agendamento por ID
    this.router.get('/:id', (req, res) => this.scheduleController.getScheduleById(req, res))

    // POST /api/schedules - Criar novo agendamento
    this.router.post('/', (req, res) => this.scheduleController.createSchedule(req, res))

    // PUT /api/schedules/:id - Atualizar agendamento
    this.router.put('/:id', (req, res) => this.scheduleController.updateSchedule(req, res))

    // DELETE /api/schedules/:id - Deletar agendamento
    this.router.delete('/:id', (req, res) => this.scheduleController.deleteSchedule(req, res))
  }

  getRouter(): Router {
    return this.router
  }
}
