import { DailyTracker } from './components/DailyTracker'
import ProgressSummary from './components/ProgressSummary'
import WeeklyTracker from './components/WeeklyTracker'
import WrappingCard from './components/WrappingCard'

const App = () => {
  return (
    <main className='mx-auto max-w-7xl p-5'>
      <header className='flex items-center'>
        <ProgressSummary />
      </header>

      <div className='flex flex-col gap-6 pt-10'>
        <WrappingCard title='Еженедельные пополнения' className='grow'>
          <WeeklyTracker />
        </WrappingCard>

        <WrappingCard title='Ежедневные задачи на неделю' className='grow-4'>
          <DailyTracker />
        </WrappingCard>

        {/* <WrappingCard title='Заметки'>
          <Notepad />
        </WrappingCard> */}
      </div>
    </main>
  )
}

export default App
