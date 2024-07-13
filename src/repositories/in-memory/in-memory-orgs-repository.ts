import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/org-repository'
import { randomUUID } from 'node:crypto'
import { OrgNotFoundError } from '@/services/errors/org-not-found-error'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []
  async findByName(name: string) {
    const org = this.items.find((item) => item.name === name)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    return org
  }

  async findByCity(city: string): Promise<Org[]> {
    const orgs = this.items.filter((item) => item.city === city)
    if (orgs.length === 0) {
      throw new OrgNotFoundError()
    }
    return orgs
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      city: data.city,
      phone: data.phone ?? null,
      address: data.address ?? null,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }
}
