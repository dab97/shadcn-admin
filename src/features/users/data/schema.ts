import { z } from 'zod'

const userStatusSchema = z.array(
  z.union([
    z.literal('Русский язык'),
    z.literal('Обществознание'),
    z.literal('Биология'),
    z.literal('Математика'),
    z.literal('История'),
    z.literal('Иностранный язык'),
    z.literal('Не указано')
  ])
);

export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('manager'),
  z.literal('студент'),
])

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,  
  createdAt: z.coerce.date()

})
export type User = z.infer<typeof userSchema> & {
  status: z.infer<typeof userStatusSchema>;
};

export const userListSchema = z.array(userSchema)
