import confetti from 'canvas-confetti'

/**
 * Запускает конфетти на весь экран
 * @param duration — продолжительность в миллисекундах (по умолчанию 3000 = 3 сек)
 */
export const launchFullScreenConfetti = (duration: number = 3000) => {
  confetti.reset()

  const count = 200
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  }

  const fire = (particleRatio: number, opts: confetti.Options) =>
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })

  const interval = setInterval(() => {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })
    fire(0.2, {
      spread: 60,
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, 200)

  setTimeout(() => {
    clearInterval(interval)
    confetti.reset()
  }, duration)
}
