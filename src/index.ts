import express from 'express'
import routes from './routes/routes'
import swaggerDocs from './swagger'

const server = express()
server.use(express.json())

const PORT = 3000

// Configuração do Swagger antes das rotas
swaggerDocs(server, PORT)

// Configuração das rotas após o Swagger
server.use(routes.routes)

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
