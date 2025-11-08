import { cn } from '@/lib/utils'
import type { FC, HTMLProps } from 'react'

const TextInput: FC<HTMLProps<HTMLInputElement>> = (props) => {
  return <input {...props} className={cn('w-100 rounded border-b border-dashed border-gray-300 px-1 text-gray-600 outline-0', props.className)} type='text' />
}

export default TextInput
