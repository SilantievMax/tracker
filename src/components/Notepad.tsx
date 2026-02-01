import { useNoteStore } from '@/stores/note'
import { ChevronLeft, ChevronRight, Eraser, Plus } from 'lucide-react'
import TextInput from './TextInput'

const Notepad = () => {
  const { page, setPage, addPage, remove, tasks: notePages, updateTitle } = useNoteStore()
  const notes = notePages[page]
  const isNewPage = page + 1 >= notePages.length

  return (
    <div className='relative'>
      {page !== 0 && (
        <button className='absolute top-0 bottom-0 -left-10 cursor-pointer rounded-sm bg-gray-300/40 text-gray-500' onClick={() => setPage(page - 1)}>
          <ChevronLeft />
        </button>
      )}
      <button
        className='absolute top-0 -right-10 bottom-0 cursor-pointer rounded-sm bg-gray-300/40 text-gray-500'
        onClick={() => {
          if (isNewPage) {
            addPage()
            setPage(page + 1)
          } else {
            setPage(page + 1)
          }
        }}
      >
        {isNewPage ? <Plus /> : <ChevronRight />}
      </button>

      <table>
        <tbody>
          {notes.map((note) => (
            <tr key={`${note.id}-${note.title}`} className='group hover:bg-gray-50'>
              <td>
                <div className='flex h-8 w-8 items-center justify-center'>
                  <div className='h-3 w-3 rounded-full bg-black/70' />
                </div>
              </td>
              <td className='w-full'>
                <TextInput defaultValue={note.title} onBlur={(e) => updateTitle(page, note.id, e.target.value)} />
              </td>
              <td className='opacity-0 transition-opacity duration-200 group-hover:opacity-30 hover:opacity-100'>
                <button className='flex h-6 w-6 cursor-pointer items-center justify-center text-red-400' onClick={() => remove(page, note.id)}>
                  <Eraser size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-center'>
        <div>
          {page + 1}/<span className='text-gray-400'>{notePages.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Notepad
