import { createFileRoute } from '@tanstack/react-router'
import Course from '@/features/course'

export const Route = createFileRoute('/(auth)/course')({
  component: Course,
})
