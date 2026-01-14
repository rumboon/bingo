import { useMemo, useState } from 'react'
import { Hero, Composer } from './features/editor'
import { PrintView } from './features/print'
import {
  parseEntries,
  uniqueEntries,
  generateCards,
  getRecommendedEntries,
} from './shared/utils'
import styles from './App.module.css'

function App() {
  const [entriesText, setEntriesText] = useState('')
  const [cardCount, setCardCount] = useState('4')
  const [cardsPerPage, setCardsPerPage] = useState('2')
  const [gridSize, setGridSize] = useState('5')
  const [cards, setCards] = useState<string[][][]>([])
  const [view, setView] = useState<'editor' | 'print'>('editor')

  const entries = useMemo(
    () => uniqueEntries(parseEntries(entriesText)),
    [entriesText],
  )
  const requestedCount = Number.parseInt(cardCount, 10)
  const safeCount = Math.max(0, Number.isFinite(requestedCount) ? requestedCount : 0)
  const cardTotal = Math.max(1, safeCount)
  const requestedPerPage = Number.parseInt(cardsPerPage, 10)
  const safePerPage = Math.min(6, Math.max(1, Number.isFinite(requestedPerPage) ? requestedPerPage : 2))
  const requestedGridSize = Number.parseInt(gridSize, 10)
  const safeGridSize = [3, 4, 5].includes(requestedGridSize) ? requestedGridSize : 5
  const recommendedEntries = getRecommendedEntries(safeGridSize)
  const canGenerate = entries.length >= recommendedEntries && safeCount > 0

  const handleGenerate = () => {
    if (!canGenerate) {
      return
    }

    setCards(generateCards(entries, cardTotal, safeGridSize))
    setView('print')
  }

  const handleShuffle = () => {
    if (!canGenerate) {
      return
    }

    setCards(generateCards(entries, cardTotal, safeGridSize))
  }

  return (
    <div className={styles.app}>
      <Hero entriesCount={entries.length} cardsQueued={safeCount} gridSize={safeGridSize} />

      <Composer
        entriesText={entriesText}
        onEntriesChange={setEntriesText}
        cardCount={cardCount}
        onCardCountChange={setCardCount}
        cardsPerPage={cardsPerPage}
        onCardsPerPageChange={setCardsPerPage}
        gridSize={gridSize}
        onGridSizeChange={setGridSize}
        entriesCount={entries.length}
        recommendedEntries={recommendedEntries}
        canGenerate={canGenerate}
        onGenerate={handleGenerate}
      />

      {view === 'print' && (
        <PrintView
          cards={cards}
          entriesCount={entries.length}
          cardsPerPage={safePerPage}
          gridSize={safeGridSize}
          onBack={() => setView('editor')}
          onShuffle={handleShuffle}
        />
      )}
    </div>
  )
}

export default App
