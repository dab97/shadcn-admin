import { Card } from '@/components/ui/card'
import CourseLayout from './course-layout'
import { CourseForm } from './components/user-course-form'

export default function Course() {
  return (
    <CourseLayout>
      <Card className='p-6'>
        <div className='mb-4 flex flex-col space-y-2 text-left'>
          <h1 className='text-primary text-2xl text-center font-semibold tracking-tight'>
            Запись на подготовительные курсы
          </h1>
          <p className='text-xs text-center text-muted-foreground'>
            Введите свой адрес электронной почты и пароль ниже, чтобы войти в
            свою учетную запись.
          </p>
        </div>
        <CourseForm />
      </Card>
    </CourseLayout>
  )
}
