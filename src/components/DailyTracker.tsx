import { WEEK_DAYS } from '@/constants/common'
import { cn } from '@/lib/utils'
import { Eraser } from 'lucide-react'
import { useMemo } from 'react'
import { useTaskStore } from '../stores/task'
import ButtonPlus from './ButtonPlus'
import { DayIndicator, type DayIndicatorType } from './DayIndicator'
import TextInput from './TextInput'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export const DailyTracker = () => {
  const { tasks, add, remove, updateTitle, updateDay } = useTaskStore()

  const todayDayIndex = useMemo(() => {
    const day = new Date().getDay()
    return day === 0 ? 6 : day - 1
  }, [])

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const aIsActive = a.types[todayDayIndex] === 'active' || a.types[todayDayIndex] === 'half'
      const bIsActive = b.types[todayDayIndex] === 'active'
      return Number(bIsActive) - Number(aIsActive)
    })
  }, [tasks, todayDayIndex])

  return (
    <table>
      <thead className='font-mono font-normal'>
        <tr>
          {WEEK_DAYS.map((day, index) => (
            <th key={day}>
              <div className={cn('flex h-8 w-8 items-center justify-center', { 'rounded border border-green-300': index === todayDayIndex })}>{day}</div>
            </th>
          ))}
          <th>
            <div className='h-4 w-4' />
          </th>
          <th className='w-full'>
            <div className='flex items-center justify-center'>задачи</div>
          </th>
          <th>
            <div className='h-4 w-4' />
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedTasks.map((task) => (
          <tr key={task.id} className='group hover:bg-gray-50'>
            {task.types.map((type, dayIndex) => (
              <td key={dayIndex} className='text-center'>
                <Popover>
                  <PopoverTrigger>
                    <div className='flex h-8 w-8 items-center justify-center'>
                      <DayIndicator type={type} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='flex w-fit items-center gap-1 p-1'>
                    {(['empty', 'active', 'filled', 'half', 'cross', 'arrow'].filter((i) => i !== task.types[dayIndex]) as DayIndicatorType[]).map((i) => (
                      <DayIndicator key={i} type={i} onClick={() => updateDay(task.id, dayIndex, i)} />
                    ))}
                  </PopoverContent>
                </Popover>
              </td>
            ))}
            <td />
            <td>
              <TextInput defaultValue={task.title} onBlur={(e) => updateTitle(task.id, e.target.value)} />
            </td>
            <td className='opacity-0 transition-opacity duration-200 group-hover:opacity-30 hover:opacity-100'>
              <button className='flex h-6 w-6 cursor-pointer items-center justify-center text-red-400' onClick={() => remove(task.id)}>
                <Eraser size={18} />
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={9} className='pt-2'>
            <div className='flex'>
              <ButtonPlus onClick={add} />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
