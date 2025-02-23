'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import MultipleSelector, { type Option } from '@/components/ui/multiselect'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { userTypes, courseTypes } from '../data/data'
import { User } from '../data/schema'

const courseOptions: Option[] = courseTypes.map((course) => ({
  value: course.value,
  label: course.label,
}))

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'First Name is required.' }),
    phone: z.string().min(1, { message: 'Phone number is required.' }),
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Email is invalid.' }),
    status: z
      .array(z.string())
      .min(1, { message: 'Выберите хотя бы один предмет' }),
    role: z.string().min(1, { message: 'Role is required.' }),
    password: z.string().transform((pwd) => pwd.trim()),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== '')) {
      if (password === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password is required.',
          path: ['password'],
        })
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must be at least 8 characters long.',
          path: ['password'],
        })
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least one lowercase letter.',
          path: ['password'],
        })
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least one number.',
          path: ['password'],
        })
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match.",
          path: ['confirmPassword'],
        })
      }
    }
  })
type UserForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          password: '',
          confirmPassword: '',
          isEdit,
        }
      : {
          name: '',
          phone: '',
          email: '',
          status: [],
          password: '',
          confirmPassword: '',
          isEdit,
        },
  })

  const onSubmit = (values: UserForm) => {
    form.reset()
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the user here. ' : 'Create new user here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[26.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2 space-y-0'>
                    <div className='flex items-center gap-4'>
                      <FormLabel className='w-1/4 text-right'>ФИО</FormLabel>
                      <FormControl className='flex-1'>
                        <Input
                          placeholder='John'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='ml-[calc(33%_+_16px)]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2 space-y-0'>
                    <div className='flex items-center gap-4'>
                      <FormLabel className='w-1/4 text-right'>
                        Номер телефона
                      </FormLabel>
                      <FormControl className='flex-1'>
                        <Input placeholder='+123456789' {...field} />
                      </FormControl>
                    </div>
                    <FormMessage className='ml-[calc(33%_+_16px)]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2 space-y-0'>
                    <div className='flex items-center gap-4'>
                      <FormLabel className='w-1/4 text-right'>Email</FormLabel>
                      <FormControl className='flex-1'>
                        <Input
                          placeholder='john.doe@gmail.com'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='ml-[calc(33%_+_16px)]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => {
                  const currentValues = field.value.map((value) => {
                    const found = courseOptions.find(
                      (opt) => opt.value === value
                    )
                    return found || { value, label: value }
                  })

                  return (
                    <FormItem className='flex flex-col gap-2 space-y-0'>
                      <div className='flex items-center gap-4'>
                        <FormLabel className='w-1/3 text-right'>
                          Статус
                        </FormLabel>
                        <FormControl className='flex-1'>
                          <MultipleSelector
                            value={currentValues}
                            onChange={(options) =>
                              field.onChange(options.map((opt) => opt.value))
                            }
                            defaultOptions={courseOptions}
                            placeholder='Выберите дисциплины'
                            badgeClassName='bg-accent text-accent-foreground max-w-full'
                            hidePlaceholderWhenSelected
                            commandProps={{
                              className: 'min-w-[300px]',
                            }}
                            emptyIndicator={
                              <p className='text-center text-sm'>
                                Ничего не найдено
                              </p>
                            }
                          />
                        </FormControl>
                      </div>
                      <FormMessage className='ml-[calc(33%_+_16px)]' />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2 space-y-0'>
                    <div className='flex items-center gap-4'>
                      <FormLabel className='w-1/4 text-right'>Роль</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select a role'
                        className='flex-1'
                        items={userTypes.map(({ label, value }) => ({
                          label,
                          value,
                        }))}
                      />
                    </div>
                    <FormMessage className='ml-[calc(33%_+_16px)]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2 space-y-0'>
                    <div className='flex items-center gap-4'>
                      <FormLabel className='w-1/4 text-right'>Пароль</FormLabel>
                      <FormControl className='flex-1'>
                        <PasswordInput
                          placeholder='e.g., S3cur3P@ssw0rd'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='ml-[calc(33%_+_16px)]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2 space-y-0'>
                    <div className='flex items-center gap-4'>
                      <FormLabel className='w-1/4 text-right'>
                        Потвердить пароль
                      </FormLabel>
                      <FormControl className='flex-1'>
                        <PasswordInput
                          disabled={!isPasswordTouched}
                          placeholder='e.g., S3cur3P@ssw0rd'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='ml-[calc(33%_+_16px)]' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            Сохранить изменения
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
