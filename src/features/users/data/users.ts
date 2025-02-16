import { faker } from '@faker-js/faker'

export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  return {
    id: faker.string.uuid(),
    firstName,
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
      'invited',
      'suspended',
    ]),
    role: faker.helpers.arrayElement([
      'superadmin',
      'admin',
      'cashier',
      'manager',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})


