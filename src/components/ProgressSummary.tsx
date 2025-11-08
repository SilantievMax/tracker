import { useMoneyboxStore } from '@/stores/moneybox'
import { useTaskStore } from '@/stores/task'
import Progress from './Progress'

const ProgressSummary = () => {
  const { tasks: tasksMoneybox } = useMoneyboxStore()
  const { tasks } = useTaskStore()

  function calculateFilledPercentage(tasks: { types: string[] }[]): number {
    const totalFilled = tasks.reduce((acc, task) => acc + task.types.filter((t) => t === 'filled').length, 0)
    const totalTypes = tasks.reduce((acc, task) => acc + task.types.length, 0)

    return totalTypes === 0 ? 0 : (totalFilled / totalTypes) * 100
  }

  return (
    <div className='ml-20 flex w-full items-center gap-4'>
      <Progress className='grow' title='Я сделал(а) %' progress={calculateFilledPercentage(tasks)} />
      <Progress className='grow' title='Я накопил(а) %' progress={calculateFilledPercentage(tasksMoneybox)} />
    </div>
  )
}

export default ProgressSummary
