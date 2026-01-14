import styles from './BingoCard.module.css'

interface BingoCardProps {
  card: string[][]
  gridSize: number
}

export function BingoCard({ card, gridSize }: BingoCardProps) {
  const hasFreeSpace = gridSize % 2 === 1
  const centerIndex = Math.floor(gridSize / 2)

  return (
    <article className={styles.card}>
      <div
        className={styles.grid}
        style={{ ['--grid-size' as string]: gridSize }}
      >
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
