import { ArrowRight, X } from 'lucide-react'
import React from 'react'
import { cn } from '../lib/utils'

export type DayIndicatorType = 'empty' | 'active' | 'filled' | 'half' | 'cross' | 'arrow'

interface DayIndicatorProps {
  type: DayIndicatorType
  onClick?: VoidFunction
}

/**
 * Визуальный индикатор статуса задачи или привычки за конкретный день.
 *
 * @param {Object} props - Свойства компонента
 * @param {'empty' | 'active' | 'filled' | 'half' | 'cross' | 'arrow'} props.type - Тип индикатора:
 *   - `'empty'` — пустой (нет действия)
 *   - `'active'` — активная
 *   - `'filled'` — полностью заполнен (выполнено)
 *   - `'half'` — наполовину заполнен (в процессе / частично)
 *   - `'cross'` — крестик (отменено / пропущено)
 *   - `'arrow'` — стрелка вправо (перенесено / отложено)
 *
 * @returns {JSX.Element} Визуальный индикатор в виде квадратной ячейки
 */
export const DayIndicator: React.FC<DayIndicatorProps> = ({ type, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn('flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded opacity-70 hover:opacity-100', {
        'border border-dashed border-gray-300': type === 'empty',
        'bg-gray-300': type === 'active',
        'bg-green-500': type === 'filled',
        'border border-red-200 text-red-500': type === 'cross',
        'border border-yellow-200 text-yellow-500': type === 'arrow',
      })}
    >
      {type === 'half' && (
        <div className='flex h-full w-full rotate-45 scale-200'>
          <div className='h-full w-1/2 bg-green-500' />
          <div className='h-full w-1/2 bg-green-100' />
        </div>
      )}

      {type === 'cross' && <X />}

      {type === 'arrow' && <ArrowRight />}
    </div>
  )
}
