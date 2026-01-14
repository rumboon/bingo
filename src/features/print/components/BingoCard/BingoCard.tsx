import styles from './BingoCard.module.css'

interface BingoCardProps {
  card: string[][]
}

export function BingoCard({ card }: BingoCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.grid}>
        {card.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            const isFree = rowIndex === 2 && cellIndex === 2
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
