import { Plus } from 'lucide-react'
import type { FC } from 'react'

interface ButtonPlusProps {
  onClick?: VoidFunction
}

const ButtonPlus: FC<ButtonPlusProps> = ({ onClick }) => {
  return (
    <button
      className='ml-1 flex flex-1 cursor-pointer items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 text-gray-500'
      onClick={onClick}
    >
      <Plus />
    </button>
  )
}

export default ButtonPlus
