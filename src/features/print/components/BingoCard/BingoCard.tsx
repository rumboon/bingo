import { type CardStyleOption, defaultCardStyle } from './styles'

interface BingoCardProps {
  card: string[][]
  gridSize: number
  includeFree: boolean
  cardStyle?: CardStyleOption
}

export function BingoCard({ card, gridSize, includeFree, cardStyle = defaultCardStyle }: BingoCardProps) {
  const hasFreeSpace = includeFree && gridSize % 2 === 1
  const centerIndex = Math.floor(gridSize / 2)
  const styles = cardStyle.styles

  return (
    <article className={styles.card} style={{ ['--grid-size' as string]: gridSize }}>
      <div className={styles.grid}>
        {card.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            const isFree = hasFreeSpace && rowIndex === centerIndex && cellIndex === centerIndex
            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`${styles.cell} ${isFree ? styles.free : ''}`}
              >
                {cell}
              </div>
            )
          }),
        )}
      </div>
    </article>
  )
}
