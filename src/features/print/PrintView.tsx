import { useMemo } from 'react'
import { BingoCard } from './components/BingoCard'
import styles from './PrintView.module.css'

interface PrintViewProps {
  cards: string[][][]
  entriesCount: number
  cardsPerPage: number
  gridSize: number
  includeFree: boolean
  onBack: () => void
  onShuffle: () => void
}

export function PrintView({
  cards,
  entriesCount,
  cardsPerPage,
  gridSize,
  includeFree,
  onBack,
  onShuffle,
}: PrintViewProps) {
  const sheets = useMemo(() => {
    const groups: string[][][][] = []
    for (let i = 0; i < cards.length; i += cardsPerPage) {
      groups.push(cards.slice(i, i + cardsPerPage))
    }
    return groups
  }, [cards, cardsPerPage])

  // Calculate grid layout based on cards per page
  const gridStyle = useMemo(() => {
    // A4 page height minus margins (297mm - 20mm = 277mm)
    // Reserve extra space for browser headers/footers so sheets don't split.
    const pageHeight = 277
    const printSafetyBuffer = 12
    const sheetHeight = Math.max(0, pageHeight - printSafetyBuffer)
    const gap = 8 // mm

    // Determine columns: 1 for 1-2 cards, 2 for 3-4, 3 for 5-6
    const columns = cardsPerPage <= 2 ? 1 : cardsPerPage <= 4 ? 2 : 3
    const rows = Math.ceil(cardsPerPage / columns)
    const totalGap = gap * (rows - 1)
    const cardHeight = (sheetHeight - totalGap) / rows

    return {
      '--cards-per-page': cardsPerPage,
      '--grid-columns': columns,
      '--grid-rows': rows,
      '--card-height': `${cardHeight}mm`,
      '--gap': `${gap}mm`,
      '--sheet-height': `${sheetHeight}mm`,
    } as React.CSSProperties
  }, [cardsPerPage])

  return (
    <section className={styles.printView}>
      <div className={`${styles.toolbar} screen-only`}>
        <div>
          <p className={styles.eyebrow}>Print view</p>
          <h2>Cards ready for A4</h2>
          <p className={styles.lead}>
            {cards.length} cards | {entriesCount} entries | {gridSize}x{gridSize} | {cardsPerPage} per page
          </p>
        </div>
        <div className={styles.toolbarActions}>
          <button
            className={`${styles.button} ${styles.ghost}`}
            type="button"
            onClick={onBack}
          >
            Back to editor
          </button>
          <button
            className={`${styles.button} ${styles.ghost}`}
            type="button"
            onClick={onShuffle}
          >
            Shuffle cards
          </button>
          <button
            className={`${styles.button} ${styles.primary}`}
            type="button"
            onClick={() => window.print()}
          >
            Print A4
          </button>
        </div>
      </div>
      <div className={styles.sheets}>
        {sheets.map((sheet, sheetIndex) => (
          <div
            className={styles.sheet}
            key={`sheet-${sheetIndex}`}
            style={{
              ['--delay' as string]: `${sheetIndex * 80}ms`,
              ...gridStyle
            }}
          >
            {sheet.map((card, cardIndex) => (
              <BingoCard
                key={`card-${sheetIndex}-${cardIndex}`}
                card={card}
                gridSize={gridSize}
                includeFree={includeFree}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
