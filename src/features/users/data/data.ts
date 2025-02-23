import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { UserStatus } from './schema'

export const callTypes = new Map<UserStatus[number], string>([
  ['Русский язык', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['Обществознание', 'bg-neutral-300/40 border-neutral-300'],
  ['Биология', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  ['Иностранный язык', 'bg-violet-200/40 text-violet-900 dark:text-violet-100 border-violet-300'],
  ['Математика','bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'],
  ['История','bg-yellow-200/40 dark:bg-yellow-900 text-yellow-700 dark:text-primary border-yellow-300'],
])

export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: IconUsersGroup,
  },
  {
    label: 'Студент',
    value: 'студент',
    icon: IconCash,
  },
] as const

export const courseTypes = [
  {
    label: 'Русский язык',
    value: 'Русский язык',
    icon: IconShield,
  },
  {
    label: 'Обществознание',
    value: 'Обществознание',
    icon: IconUserShield,
  },
  {
    label: 'Математика',
    value: 'Математика',
    icon: IconUsersGroup,
  },
  {
    label: 'Биология',
    value: 'Биология',
    icon: IconCash,
  },
  {
    label: 'История',
    value: 'История',
    icon: IconUsersGroup,
  },
  {
    label: 'Иностранный язык',
    value: 'Иностранный язык',
    icon: IconCash,
  },
] as const
