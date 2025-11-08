import { Eraser, Plus } from 'lucide-react'
import { useTaskStore } from '../stores/task'
import { DayIndicator, type DayIndicatorType } from './DayIndicator'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const WEEK_DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'] as const

export const WeeklyTracker: React.FC = () => {
  const { tasks, addTask, removeTask, updateTaskTitle, updateTaskDay } = useTaskStore()

  return (
    <table>
      <thead className='font-normal'>
        <tr>
          {WEEK_DAYS.map((day) => (
            <th key={day}>
              <div className='h-8 w-8'>{day}</div>
            </th>
          ))}
          <th>
            <div className='h-4 w-4' />
          </th>
          <th>
            <div className='h-8 w-8'>задачи</div>
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
                    {(['empty', 'active', 'filled', 'half', 'cross', 'arrow'].filter((i) => i !== task.types[dayIndex]) as DayIndicatorType[]).map((i) => (
                      <DayIndicator type={i} onClick={() => updateTaskDay(task.id, dayIndex, i)} />
                    ))}
                  </PopoverContent>
                </Popover>
              </td>
            ))}
            <td />
            <td>
              <input
                className='w-100 rounded border-b border-dashed border-gray-300 px-1 outline-0'
                type='text'
                defaultValue={task.title}
                onBlur={(e) => updateTaskTitle(task.id, e.target.value)}
              />
            </td>
            <td className='opacity-0 transition-opacity duration-200 group-hover:opacity-30 hover:opacity-100'>
              <button className='flex h-6 w-6 cursor-pointer items-center justify-center text-red-400' onClick={() => removeTask(task.id)}>
                <Eraser size={18} />
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={9} className='pt-2'>
            <div className='flex'>
              <button
                className='ml-1 flex flex-1 cursor-pointer items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 text-gray-500'
                onClick={addTask}
              >
                <Plus />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
