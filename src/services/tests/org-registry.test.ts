import { describe, it, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgRegisterService } from '../org-register-service'

describe('Organizations Registry Use Case', () => {
  it('should be able to register an organization', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrgsService = new OrgRegisterService(orgsRepository)

    const { org } = await registerOrgsService.execute({
      name: 'ONG dos Campeões',
      address: 'Rua Verde 321',
      city: 'São Paulo',
      phone: '(11) 99999-9999',
      password_hash: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
