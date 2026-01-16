import { useMemo, useState } from 'react'
import { Hero, Composer } from './features/editor'
import { PrintView, cardStyleOptions, defaultCardStyle, getCardStyleById, type CardStyleOption } from './features/print'
import {
  parseEntries,
  uniqueEntries,
  generateCards,
  getRecommendedEntries,
} from './shared/utils'
import styles from './App.module.css'

function App() {
  const [entriesText, setEntriesText] = useState(`asputin
All I want for Christmas is you
Ich bin wie du
Dragostea din Tei
Casanova
Rainbow in the Sky
Leef
Mexico
Liever te dik in de kist
La Bomba
Bombastic
Que Si Que no
Sammy
Twee Motten
Livin la Vida Loca
L’Amour Toujours
Simarik
Romana op de Scooter
Vogeltjesdans
Toppertje
Alice
Night Fever
Lemon Tree
De Kerstezel
Ik Wil nog dit ik wil nog dat
Ik ben een Kerstbal
Flapte
Last Christmas
Feliz Navidad
Merry Xmas Everybody
Ooit zal ik Gaan
Wacht maar tot ik Koning Ben
Dat is Waar
Into the Unknown
Roundabout
Shake it Off
Crazy Train
Wuthering Heights
Higher Ground
Its Raining men
Venus
Automatic
Autobahn
Faith
Don’t Feel Like Dancing
That Don’t Impress me Much
Alane
Lay All Your Love on Me
Can’t Get You out of My Head
Murder on the Dancefloor
Ma Quale Idea
Oya Lele
Leonardo
Do They Know Its Christmas
Ring of Fire
Livin on A Prayer
One Way or Another
Zing Vecht Lach Huil Werk en Bewonder
Feel - Robbie Williams
Angels - Robbie Williams
Allemaal Kabaal
Verliefdheid is Maar Niks`)
  const [cardCount, setCardCount] = useState('4')
  const [cardsPerPage, setCardsPerPage] = useState('2')
  const [gridSize, setGridSize] = useState('5')
  const [includeFree, setIncludeFree] = useState(true)
  const [cardStyleId, setCardStyleId] = useState(defaultCardStyle.id)
  const [cards, setCards] = useState<string[][][]>([])
  const [view, setView] = useState<'editor' | 'print'>('editor')

  const selectedCardStyle = getCardStyleById(cardStyleId)

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
  const recommendedEntries = getRecommendedEntries(safeGridSize, includeFree)
  const canGenerate = entries.length >= recommendedEntries && safeCount > 0

  const handleGenerate = () => {
    if (!canGenerate) {
      return
    }

    setCards(generateCards(entries, cardTotal, safeGridSize, includeFree))
    setView('print')
  }

  const handleShuffle = () => {
    if (!canGenerate) {
      return
    }

    setCards(generateCards(entries, cardTotal, safeGridSize, includeFree))
  }

  return (
    <div className={styles.app}>
      <Hero
        entriesCount={entries.length}
        cardsQueued={safeCount}
        gridSize={safeGridSize}
        includeFree={includeFree}
      />

      <Composer
        entriesText={entriesText}
        onEntriesChange={setEntriesText}
        cardCount={cardCount}
        onCardCountChange={setCardCount}
        cardsPerPage={cardsPerPage}
        onCardsPerPageChange={setCardsPerPage}
        gridSize={gridSize}
        onGridSizeChange={setGridSize}
        includeFree={includeFree}
        onIncludeFreeChange={setIncludeFree}
        cardStyleId={cardStyleId}
        onCardStyleChange={setCardStyleId}
        cardStyleOptions={cardStyleOptions}
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
          includeFree={includeFree}
          cardStyle={selectedCardStyle}
          onBack={() => setView('editor')}
          onShuffle={handleShuffle}
        />
      )}
    </div>
  )
}

export default App
