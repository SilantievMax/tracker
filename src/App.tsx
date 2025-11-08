import { WeeklyTracker } from './components/WeeklyTracker'
import WrappingCard from './components/WrappingCard'

const App = () => {
  return (
    <main className='mx-auto max-w-7xl p-5'>
      <WrappingCard title='Ежедневные задачи'>
        <WeeklyTracker />
      </WrappingCard>
    </main>
  )
}

export default App
