import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../org-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByPhone(phone: string) {
    const orgPhone = await prisma.org.findUnique({
      where: {
        phone,
      },
    })

    if (!orgPhone) {
      return null
    }

    return orgPhone
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
