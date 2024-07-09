import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../org-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByPhone(phone: string) {
    const org = this.items.find((item) => item.phone === phone)

    if (!org) {
      return null
    }

    return org
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
