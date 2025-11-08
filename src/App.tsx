import { DailyTracker } from './components/DailyTracker'
import Emotion from './components/Emotion'
import ProgressSummary from './components/ProgressSummary'
import WeeklyTracker from './components/WeeklyTracker'
import WrappingCard from './components/WrappingCard'

const App = () => {
  return (
    <main className='mx-auto max-w-7xl p-5'>
      <header className='flex items-center border-b pb-6'>
        <Emotion />

        <ProgressSummary />
      </header>

      <div className='mt-5 flex flex-wrap justify-center gap-6'>
        <WrappingCard title='Ежедневные задачи на неделю'>
          <DailyTracker />
        </WrappingCard>

        <WrappingCard title='Еженедельные пополнения'>
          <WeeklyTracker />
        </WrappingCard>
      </div>
    </main>
  )
}

export default App
