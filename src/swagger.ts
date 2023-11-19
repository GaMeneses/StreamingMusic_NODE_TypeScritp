import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express, Request, Response } from 'express'

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Streaming de Música',
      version: '1.0.0',
      description: 'Uma API para lidar com informações sobre músicas, playlists, autores e usuários',
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: [__dirname + '/routes/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs(server: Express, port: number) {
  server.use(
    '/documentacao',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      swaggerOptions: {
        plugins: [
          {
            statePlugins: {
              spec: {
                wrapSelectors: {
                  allowAuthorize: () => () => true,
                },
              },
            },
          },
        ],
        security: [{ bearerAuth: [] }],
      },
    }),
  )

  server.get('/doc.json', (req: Request, res: Response) => {
    res.setHeader('content-type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(`Documentação em http://localhost:${port}/documentacao`)
}

export default swaggerDocs
