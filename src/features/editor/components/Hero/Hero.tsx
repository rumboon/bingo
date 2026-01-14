import styles from './Hero.module.css'

interface HeroProps {
  entriesCount: number
  cardsQueued: number
  gridSize: number
  includeFree: boolean
}

export function Hero({ entriesCount, cardsQueued, gridSize, includeFree }: HeroProps) {
  const hasFreeSpace = includeFree && gridSize % 2 === 1

  return (
    <header className={`${styles.hero} screen-only`}>
      <div className={styles.heroText}>
        <p className={styles.eyebrow}>Bingo Card Studio</p>
        <h1>Turn any list into print-ready bingo cards.</h1>
        <p className={styles.lead}>
          Paste your prompts, pick the number of cards, and jump straight to a
          printable layout with two cards per A4 sheet.
        </p>
        <div className={styles.pillRow}>
          <span className={styles.pill}>{gridSize}x{gridSize} layout</span>
          <span className={styles.pill}>{hasFreeSpace ? 'Free center space' : 'No free space'}</span>
          <span className={styles.pill}>2 cards per page</span>
        </div>
      </div>
      <div className={styles.panel}>
        <h2>Quick setup</h2>
        <ol className={styles.steps}>
          <li>Add one entry per line.</li>
          <li>Generate as many cards as you need.</li>
          <li>Print from the ready-made sheet view.</li>
        </ol>
        <div className={styles.stats}>
          <div>
            <span className={styles.statLabel}>Unique entries</span>
            <span className={styles.statValue}>{entriesCount}</span>
          </div>
          <div>
            <span className={styles.statLabel}>Cards queued</span>
            <span className={styles.statValue}>{cardsQueued}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
