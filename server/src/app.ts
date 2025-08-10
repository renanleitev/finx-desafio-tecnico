import express, { Express } from 'express'
import cors from 'cors'

import { ScheduleRepository } from './repositories/ScheduleRepository'
import { ScheduleService } from './services/ScheduleService'
import { ScheduleController } from './controllers/ScheduleController'
import { ScheduleRoutes } from './routes/scheduleRoutes'
import { ErrorHandler } from './middlewares/errorHandler'

export class App {
  private app: Express
  private scheduleRepository!: ScheduleRepository

  // Services
  private scheduleService!: ScheduleService

  // Controllers
  private scheduleController!: ScheduleController

  // Routes
  private scheduleRoutes!: ScheduleRoutes

  constructor() {
    this.app = express()
    this.initializeDependencies()
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  private initializeDependencies(): void {
    // Repository
    this.scheduleRepository = new ScheduleRepository()

    // Services
    this.scheduleService = new ScheduleService(this.scheduleRepository)

    // Controllers
    this.scheduleController = new ScheduleController(this.scheduleService)

    // Routes
    this.scheduleRoutes = new ScheduleRoutes(this.scheduleController)
  }

  private initializeMiddlewares(): void {
    // CORS
    this.app.use(
      cors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      }),
    )

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }))
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }))
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use('/api/schedules', this.scheduleRoutes.getRouter())
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(ErrorHandler.notFound)

    // Global error handler
    this.app.use(ErrorHandler.handle)
  }

  public getApp(): Express {
    return this.app
  }

  public async start(port: number): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
        resolve()
      })
    })
  }
}
