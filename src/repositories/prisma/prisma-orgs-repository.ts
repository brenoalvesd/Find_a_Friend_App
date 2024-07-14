import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '@/repositories/org-repository'
import { OrgNotFoundError } from '@/services/errors/org-not-found-error'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByName(name: string) {
    const org = await prisma.org.findUnique({
      where: {
        name,
      },
    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByCity(city: string) {
    const org = await prisma.org.findMany({
      where: {
        city,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
