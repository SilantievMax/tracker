import { MONTH_WEEKS } from '@/constants/common'
import { useMoneyboxStore } from '@/stores/moneybox'
import { Eraser } from 'lucide-react'
import ButtonPlus from './ButtonPlus'
import { DayIndicator, type DayIndicatorType } from './DayIndicator'
import TextInput from './TextInput'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const WeeklyTracker = () => {
  const { tasks, add, remove, updateTitle, updateDay } = useMoneyboxStore()

  return (
    <table>
      <thead className='font-mono font-normal'>
        <tr>
          {MONTH_WEEKS.map((day) => (
            <th key={day}>
              <div className='flex h-8 w-8 items-center justify-center'>{day}</div>
            </th>
          ))}
          <th>
            <div className='h-4 w-4' />
          </th>
          <th>
            <div className='flex items-center justify-center'>задачи</div>
          </th>
          <th>
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
            <td>
              <TextInput className='w-50' defaultValue={task.title} onBlur={(e) => updateTitle(task.id, e.target.value)} />
            </td>
            <td className='opacity-0 transition-opacity duration-200 group-hover:opacity-30 hover:opacity-100'>
              <button className='flex h-6 w-6 cursor-pointer items-center justify-center text-red-400' onClick={() => remove(task.id)}>
                <Eraser size={18} />
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={6} className='pt-2'>
            <div className='flex'>
              <ButtonPlus onClick={add} />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default WeeklyTracker
