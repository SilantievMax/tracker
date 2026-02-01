import { NOTE_STORAGE_KEY } from '@/constants/common'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Note = {
  id: string
  title: string
}

type Notes = Note[][]

interface NoteStore {
  tasks: Notes
  page: number

  setPage: (page: number) => void
  addPage: () => void
  updateTitle: (pageId: number, noteId: string, title: string) => void
  remove: (pageId: number, noteId: string) => void
}

const createNewPage = (): Note[] =>
  Array.from({ length: 10 }).map(() => ({
    id: crypto.randomUUID(),
    title: '',
  }))

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      tasks: [createNewPage()],
      page: 0,

      setPage: (page) => set({ page }),
      addPage: () =>
        set((state) => ({
          tasks: [...state.tasks, createNewPage()],
        })),
      updateTitle: (pageId, noteId, title) =>
        set((state) => ({
          tasks: state.tasks.map((page, index) =>
            index === pageId ? page.map((note) => (note.id === noteId ? { ...note, title: title.trim() } : note)) : page
          ),
        })),
      remove: (pageId, noteId) =>
        set((state) => ({
          tasks: state.tasks.map((page, index) => (index === pageId ? page.map((note) => (note.id === noteId ? { ...note, title: '' } : note)) : page)),
        })),
    }),
    {
      name: NOTE_STORAGE_KEY,
      version: 1,
    }
  )
)
