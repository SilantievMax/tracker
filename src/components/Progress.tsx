import { type FC } from 'react'

interface ProgressProps {
  title: string
  progress?: number
  className?: string
}

const Progress: FC<ProgressProps> = ({ className, title, progress = 0 }) => {
  return (
    <div className={className}>
      <h2 className='font-mono font-bold text-nowrap'>{title}</h2>
      <div className='shadow-sharp-sx relative h-4 w-full overflow-hidden rounded-2xl border border-black'>
        <div style={{ width: `${progress}%` }} className='h-full bg-green-400' />
      </div>
    </div>
  )
}

export default Progress
