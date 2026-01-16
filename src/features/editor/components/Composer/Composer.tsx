import type { CardStyleOption } from '../../../print'
import styles from './Composer.module.css'

interface ComposerProps {
  entriesText: string
  onEntriesChange: (text: string) => void
  cardCount: string
  onCardCountChange: (count: string) => void
  cardsPerPage: string
  onCardsPerPageChange: (count: string) => void
  gridSize: string
  onGridSizeChange: (size: string) => void
  includeFree: boolean
  onIncludeFreeChange: (value: boolean) => void
  cardStyleId: string
  onCardStyleChange: (styleId: string) => void
  cardStyleOptions: CardStyleOption[]
  entriesCount: number
  recommendedEntries: number
  canGenerate: boolean
  onGenerate: () => void
}

export function Composer({
  entriesText,
  onEntriesChange,
  cardCount,
  onCardCountChange,
  cardsPerPage,
  onCardsPerPageChange,
  gridSize,
  onGridSizeChange,
  includeFree,
  onIncludeFreeChange,
  cardStyleId,
  onCardStyleChange,
  cardStyleOptions,
  entriesCount,
  recommendedEntries,
  canGenerate,
  onGenerate,
}: ComposerProps) {
  const gridSizeNumber = Number.parseInt(gridSize, 10)
  const supportsFree = gridSizeNumber % 2 === 1

  return (
    <section className={`${styles.composer} screen-only`}>
      <div className={`${styles.panel} ${styles.field}`}>
        <label htmlFor="entries" className={styles.label}>
          Entries (one per line)
        </label>
        <textarea
          id="entries"
          className={styles.textarea}
          placeholder={`Icebreaker question\nCompany value\nWorkshop prompt\nCelebrate a win`}
          value={entriesText}
          onChange={(event) => onEntriesChange(event.target.value)}
          rows={14}
        />
        <div className={styles.fieldMeta}>
          <span>
            {entriesCount} unique entries · Recommended: {recommendedEntries} for {gridSize}x{gridSize}
          </span>
          <span
            className={`${styles.status} ${
              entriesCount >= recommendedEntries ? styles.statusReady : styles.statusWarn
            }`}
          >
            {entriesCount >= recommendedEntries
              ? 'Ready to generate'
              : `Add ${recommendedEntries - entriesCount} more`}
          </span>
        </div>
      </div>
      <div className={`${styles.panel} ${styles.controls}`}>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="cardCount" className={styles.label}>
              Number of cards
            </label>
            <input
              id="cardCount"
              className={styles.input}
              type="number"
              min={1}
              max={200}
              value={cardCount}
              onChange={(event) => onCardCountChange(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="cardsPerPage" className={styles.label}>
              Cards per page
            </label>
            <input
              id="cardsPerPage"
              className={styles.input}
              type="number"
              min={1}
              max={6}
              value={cardsPerPage}
              onChange={(event) => onCardsPerPageChange(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="gridSize" className={styles.label}>
            Grid size
          </label>
          <select
            id="gridSize"
            className={styles.input}
            value={gridSize}
            onChange={(event) => onGridSizeChange(event.target.value)}
          >
            <option value="3">3 x 3</option>
            <option value="4">4 x 4</option>
            <option value="5">5 x 5</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="cardStyle" className={styles.label}>
            Card style
          </label>
          <select
            id="cardStyle"
            className={styles.input}
            value={cardStyleId}
            onChange={(event) => onCardStyleChange(event.target.value)}
          >
            {cardStyleOptions.map((style) => (
              <option key={style.id} value={style.id}>
                {style.name}
              </option>
            ))}
          </select>
        </div>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={supportsFree && includeFree}
            disabled={!supportsFree}
            onChange={(event) => onIncludeFreeChange(event.target.checked)}
          />
          <span>Include free center space {supportsFree ? '' : '(odd grids only)'}</span>
        </label>
        <button
          className={`${styles.button} ${styles.primary}`}
          type="button"
          onClick={onGenerate}
          disabled={!canGenerate}
        >
          Generate print view
        </button>
        <p className={styles.helper}>
          Cards are randomized per sheet. Use "Shuffle cards" in print view
          for a new mix.
        </p>
      </div>
    </section>
  )
}
