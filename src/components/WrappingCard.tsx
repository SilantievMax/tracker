import { cn } from '@/lib/utils'
import type { FC, PropsWithChildren } from 'react'

interface WrappingCardProps extends PropsWithChildren {
  title: string
  className?: string
}

const WrappingCard: FC<WrappingCardProps> = ({ children, title, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      <h2 className='font-mono text-xl font-bold'>{title}</h2>
      <div className='shadow-sharp rounded-2xl border p-2 max-sm:!shadow-none'>{children}</div>
    </div>
  )
}

export default WrappingCard
