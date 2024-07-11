export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Organization already registered! Check your data input.')
  }
}
