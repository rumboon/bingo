import { MIN_ENTRIES } from '../../../../shared/utils'
import styles from './Composer.module.css'

interface ComposerProps {
  entriesText: string
  onEntriesChange: (text: string) => void
  cardCount: string
  onCardCountChange: (count: string) => void
  cardsPerPage: string
  onCardsPerPageChange: (count: string) => void
  entriesCount: number
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
  entriesCount,
  canGenerate,
  onGenerate,
}: ComposerProps) {
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
          <span>{entriesCount} unique entries</span>
          <span
            className={`${styles.status} ${
              entriesCount >= MIN_ENTRIES ? styles.statusReady : styles.statusWarn
            }`}
          >
            {entriesCount >= MIN_ENTRIES
              ? 'Ready to generate'
              : `Add ${MIN_ENTRIES - entriesCount} more`}
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
