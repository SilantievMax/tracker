import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DayIndicatorType } from '../components/DayIndicator'

interface Task {
  id: string
  title: string
  types: DayIndicatorType[]
}

interface TaskStore {
  tasks: Task[]

  addTask: () => void
  updateTaskTitle: (id: string, title: string) => void
  updateTaskDay: (taskId: string, dayIndex: number, type: DayIndicatorType) => void
  removeTask: (id: string) => void
  resetTasks: () => void
}

const createEmptyWeek = (): DayIndicatorType[] => Array.from({ length: 7 }, () => 'empty' as DayIndicatorType)
const initialTasks: Task[] = [{ id: crypto.randomUUID(), title: 'Твоя первая таска', types: createEmptyWeek() }]

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: initialTasks,

      addTask: () =>
        set((state) => ({
          tasks: [...state.tasks, { id: crypto.randomUUID(), title: 'Новая задача', types: createEmptyWeek() }],
        })),

      updateTaskTitle: (id, title) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, title: title.trim() || task.title } : task)),
        })),

      // 📅 Обновить статус дня
      updateTaskDay: (taskId, dayIndex, type) =>
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

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      // ♻️ Сбросить к начальному состоянию
      resetTasks: () => set({ tasks: initialTasks }),
    }),
    {
      name: 'task-storage',
      version: 1,
    }
  )
)
