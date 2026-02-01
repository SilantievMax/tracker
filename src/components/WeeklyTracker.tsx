import { MAX_COUNT_WEEKS, MONTH_WEEKS } from '@/constants/common'
import { cn } from '@/lib/utils'
import { useMoneyboxStore } from '@/stores/moneybox'
import { Eraser } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import ButtonPlus from './ButtonPlus'
import { DayIndicator, type DayIndicatorType } from './DayIndicator'
import TextInput from './TextInput'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const WeeklyTracker = () => {
  const { tasks, add, remove, updateTitle, updateDay, updateCountWeeks } = useMoneyboxStore()

  const todayWeekIndex = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + 4 - (d.getDay() || 7))
    const yearStart = new Date(d.getFullYear(), 0, 1)
    const weekNo = Math.ceil(((+d - +yearStart) / 86400000 + 1) / 7)
    return weekNo - 1
  }, [])

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.types.length !== MAX_COUNT_WEEKS) {
        updateCountWeeks(task.id)
      }
    })
  }, [])

  return (
    <div className='overflow-x-auto'>
      <table>
        <thead className='font-mono font-normal'>
          <tr>
            {MONTH_WEEKS.map((day, index) => (
              <th key={day}>
                <div className={cn('flex h-8 w-8 items-center justify-center', { 'rounded border border-green-300': index === todayWeekIndex })}>{day}</div>
              </th>
            ))}
            <th>
              <div className='h-4 w-4' />
            </th>
            <th className='sticky right-6 min-w-120 bg-white'>
              <div className='flex items-center justify-center'>задачи</div>
            </th>
            <th className='sticky right-0 bg-white'>
              <div className='h-4 w-4' />
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
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
                      {(['empty', 'filled', 'cross'].filter((i) => i !== task.types[dayIndex]) as DayIndicatorType[]).map((i) => (
                        <DayIndicator key={i} type={i} onClick={() => updateDay(task.id, dayIndex, i)} />
                      ))}
                    </PopoverContent>
                  </Popover>
                </td>
              ))}
              <td />
              <td className='sticky right-6 bg-white'>
                <TextInput defaultValue={task.title} onBlur={(e) => updateTitle(task.id, e.target.value)} />
              </td>
              <td className='sticky right-0 bg-white duration-200'>
                <button
                  className='flex h-6 w-6 cursor-pointer items-center justify-center text-red-400 opacity-0 transition-opacity group-hover:opacity-30 hover:opacity-100'
                  onClick={() => remove(task.id)}
                >
                  <Eraser size={18} />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={MONTH_WEEKS.length} className='pt-2'></td>

            <td colSpan={3} className='sticky right-0 pt-2'>
              <div className='flex'>
                <ButtonPlus onClick={add} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WeeklyTracker
