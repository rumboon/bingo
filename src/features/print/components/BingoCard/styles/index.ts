import classicStyles from './classic.module.css'
import redStyles from './red.module.css'

export type CardStyleModule = typeof classicStyles

export interface CardStyleOption {
  id: string
  name: string
  styles: CardStyleModule
}

export const cardStyleOptions: CardStyleOption[] = [
  { id: 'classic', name: 'Classic', styles: classicStyles },
  { id: 'red', name: 'Red', styles: redStyles },
]

export const defaultCardStyle = cardStyleOptions[0]

export function getCardStyleById(id: string): CardStyleOption {
  return cardStyleOptions.find((style) => style.id === id) ?? defaultCardStyle
}
