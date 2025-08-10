import { App } from './app'

async function bootstrap(): Promise<void> {
  try {
    const app = new App()
    const port = parseInt(process.env.PORT || '3001', 10)

    await app.start(port)

    process.on('SIGTERM', () => {
      console.log('Encerrando a aplicação...')
      process.exit(0)
    })

    process.on('SIGINT', () => {
      console.log('Encerrando a aplicação...')
      process.exit(0)
    })

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason)
      process.exit(1)
    })

    process.on('uncaughtException', (error: Error) => {
      console.error('Uncaught Exception:', error)
      process.exit(1)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Start the server
if (require.main === module) {
  bootstrap()
}

export { App }
