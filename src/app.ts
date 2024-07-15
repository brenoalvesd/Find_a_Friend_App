import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { ZodError } from 'zod'

import { orgRoutes } from './http/controllers/orgs/routes'
import { userRoutes } from './http/controllers/user/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(orgRoutes)
app.register(userRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    console.error('An unexpected error occurred:', error.message)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
