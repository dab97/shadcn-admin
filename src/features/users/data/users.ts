// import { faker } from '@faker-js/faker'

// export const users = Array.from({ length: 20 }, () => {
//   const name = faker.person.name()
//   return {
//     id: faker.string.uuid(),
//     name,
//     email: faker.internet.email({ name }).toLocaleLowerCase(),
//     phone: faker.phone.number({ style: 'international' }),
//     status: faker.helpers.arrayElement([
//       'Русский язык',
//       'Обществознание',
//       'Биология',
//       'Математика',
//       'История',
//       'Иностранный язык',
//     ]),
//     role: faker.helpers.arrayElement([
//       'superadmin',
//       'admin',
//       'cashier',
//       'manager',
//     ]),
//     createdAt: faker.date.past(),
//     updatedAt: faker.date.recent(),
//   }
// })

// import { abiturients } from './abitur'

// export const users = abiturients.map((abitur) => {
//   // Парсинг даты с обработкой ошибок
//   const parseDate = (dateString: string) => {
//     const [day, month, year, time] = dateString.split(/[ .:]/)
//     try {
//       return new Date(`${year}-${month}-${day}T${time}`)
//     } catch {
//       return new Date() // резервная дата при ошибке
//     }
//   }

//   return {
//     id: abitur.id,    
//     name: abitur.name?.trim() || 'Неизвестный',
//     email: abitur.email?.toLowerCase() || '',
//     phone: abitur.phone({ style: 'international' }),
//     status: abitur.courses.split(', ')[0] || 'Не указано',
//     // role: 'student',
//     createdAt: parseDate(abitur.time)
//   }
// })

import { abiturients } from './abitur'

export const users = abiturients.map((abitur) => {
  // Парсинг даты (остается без изменений)
  const parseDate = (dateString: string): Date => {
    try {
      const [datePart, timePart] = dateString.split(' ')
      const [day, month, year] = datePart.split('.')
      const [hours, minutes, seconds] = timePart.split(':')
      
      const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${
        hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${(seconds || '00').padStart(2, '0')}`
      
      const date = new Date(isoDate)
      if (isNaN(date.getTime())) throw new Error('Invalid Date')
      return date
    } catch {
      return new Date(2000, 0, 1)
    }
  }

  const statuses = abitur.courses
    .split(', ')
    .filter(course => [
      'Русский язык',
      'Обществознание',
      'Биология',
      'Математика',
      'История',
      'Иностранный язык'
    ].includes(course))

  return {
    id: abitur.id,
    name: abitur.name,
    phone: abitur.phone,
    email: abitur.email.toLowerCase(),
    status: statuses.length > 0 ? statuses : ['Не указано'], // ✅ Массив
    role:  abitur.role || 'студент'.toLowerCase(),
    createdAt: parseDate(abitur.time)
  };
})

