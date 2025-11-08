import { MONEYBOX_STORAGE_KEY } from '@/constants/common'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DayIndicatorType } from '../components/DayIndicator'

interface Moneybox {
  id: string
  title: string
  types: DayIndicatorType[]
}

interface MoneyboxStore {
  tasks: Moneybox[]

  add: () => void
  updateTitle: (id: string, title: string) => void
  updateDay: (taskId: string, dayIndex: number, type: DayIndicatorType) => void
  remove: (id: string) => void
}

const createEmptyWeek = (): DayIndicatorType[] => Array.from({ length: 4 }, () => 'empty' as DayIndicatorType)
const initialTasks: Moneybox[] = [{ id: crypto.randomUUID(), title: 'Твоя первая задача', types: createEmptyWeek() }]

export const useMoneyboxStore = create<MoneyboxStore>()(
  persist(
    (set) => ({
      tasks: initialTasks,

      add: () =>
        set((state) => ({
          tasks: [...state.tasks, { id: crypto.randomUUID(), title: '', types: createEmptyWeek() }],
        })),

      updateTitle: (id, title) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, title: title.trim() || task.title } : task)),
        })),

      updateDay: (taskId, dayIndex, type) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  types: task.types.map((t, i) => (i === dayIndex ? type : t)),
                }
              : task
          ),
        })),

      remove: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: MONEYBOX_STORAGE_KEY,
      version: 1,
    }
  )
)
