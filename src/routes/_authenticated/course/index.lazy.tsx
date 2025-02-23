import { createLazyFileRoute } from '@tanstack/react-router'
import Users from '@/features/course'

export const Route = createLazyFileRoute('/_authenticated/course/')({
  component: Users,
})
