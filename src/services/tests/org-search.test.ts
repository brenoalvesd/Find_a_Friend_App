import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { SearchOrgsService } from '../org-search-by-name-service'
import { it, expect, describe } from 'vitest'

describe('Organizations Search Use Case', () => {
  it('should be able to search for an organization by its name', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new SearchOrgsService(orgsRepository)

    const orgData = {
      name: 'ONG dos Campeões',
      address: 'Rua Verde 321',
      city: 'São Paulo',
      phone: '(11) 99999-9999',
      password_hash: '123456',
    }

    await orgsRepository.create(orgData)

    const foundOrg = await sut.findByName({
      name: 'ONG dos Campeões',
    })

    expect(foundOrg.org).toEqual(
      expect.objectContaining({
        name: 'ONG dos Campeões',
        address: 'Rua Verde 321',
        city: 'São Paulo',
        phone: '(11) 99999-9999',
        password_hash: '123456',
      }),
    )
  })
})
