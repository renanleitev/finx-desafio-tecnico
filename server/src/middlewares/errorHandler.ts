import { Request, Response } from 'express'
import { ApiResponse } from '../types/api'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export class ErrorHandler {
  static handle(err: AppError, req: Request, res: Response): void {
    const { statusCode = 500, message } = err

    console.error('Error occurred:', {
      error: err,
      request: {
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body,
      },
      timestamp: new Date().toISOString(),
    })

    const response: ApiResponse = {
      success: false,
      message: statusCode === 500 ? 'Erro interno do servidor' : message,
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    }

    res.status(statusCode).json(response)
  }

  static notFound(req: Request, res: Response): void {
    const response: ApiResponse = {
      success: false,
      message: `Rota ${req.method} ${req.originalUrl} não encontrada`,
    }

    res.status(404).json(response)
  }

  static createError(message: string, statusCode: number = 500): AppError {
    const error = new Error(message) as AppError
    error.statusCode = statusCode
    error.isOperational = true
    return error
  }
}
