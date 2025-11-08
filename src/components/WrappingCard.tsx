import type { FC, PropsWithChildren } from 'react'

interface WrappingCardProps extends PropsWithChildren {
  title: string
}

const WrappingCard: FC<WrappingCardProps> = ({ children, title }) => {
  return (
    <div className='space-y-2'>
      <h2 className='font-mono text-xl font-bold'>{title}</h2>
      <div className='shadow-sharp w-fit rounded-2xl border p-2'>{children}</div>
    </div>
  )
}

export default WrappingCard
