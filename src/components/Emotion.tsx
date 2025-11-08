import awesome from '@/assets/icons/awesome.svg'
import happy from '@/assets/icons/happy.svg'
import okay from '@/assets/icons/okay.svg'
import sad from '@/assets/icons/sad.svg'
import tickMode from '@/assets/icons/tick-mode.svg'
import varySad from '@/assets/icons/vary-sad.svg'
import { EMOTION_STORAGE_KEY } from '@/constants/common'
import { useEffect, useState } from 'react'

const icons = [awesome, happy, okay, sad, varySad]

const Emotion = () => {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const savedEmotion = localStorage.getItem(EMOTION_STORAGE_KEY)
    if (savedEmotion) {
      setActive(JSON.parse(savedEmotion))
    }
  }, [])

  useEffect(() => {
    if (active !== null) {
      localStorage.setItem(EMOTION_STORAGE_KEY, JSON.stringify(active))
    } else {
      localStorage.removeItem(EMOTION_STORAGE_KEY)
    }
  }, [active])

  const handleEmotionClick = (index: number) => {
    setActive(active === index ? null : index)
  }

  return (
    <div className='shrink-0'>
      <div className='font-mono font-semibold'>Мой день сегодня</div>
      <div className='mt-2 flex items-center gap-2'>
        {icons.map((icon, index) => (
          <button key={index} className='relative cursor-pointer' onClick={() => handleEmotionClick(index)}>
            <img src={icon} alt='Smile' width='36' height='36' />
            {active === index && <img src={tickMode} alt='tickMode' width='20' height='20' className='absolute left-1/2 -translate-x-1/2' />}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Emotion
