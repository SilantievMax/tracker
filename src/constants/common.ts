export const WEEK_DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'] as const
export const MAX_COUNT_WEEKS = 53
export const MONTH_WEEKS = Array.from({ length: MAX_COUNT_WEEKS }).map((_, i) => `н${i + 1}`)

export const TASK_STORAGE_KEY = 'task-storage'
export const MONEYBOX_STORAGE_KEY = 'moneybox-storage'
export const NOTE_STORAGE_KEY = 'note-storage'
export const EMOTION_STORAGE_KEY = 'selected-emotion'
