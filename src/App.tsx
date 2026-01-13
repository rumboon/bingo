import { useMemo, useState } from 'react'
import './App.css'

const FREE_LABEL = 'FREE'
const MIN_ENTRIES = 24

const parseEntries = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const uniqueEntries = (entries: string[]) => Array.from(new Set(entries))

const shuffle = (items: string[]) => {
  const array = [...items]
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const chunk = (items: string[], size: number) => {
  const result: string[][] = []
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size))
  }
  return result
}

const buildCard = (entries: string[]) => {
  const picks = shuffle(entries).slice(0, MIN_ENTRIES)
  const cells: string[] = []
  let pickIndex = 0

  for (let i = 0; i < 25; i += 1) {
    if (i === 12) {
      cells.push(FREE_LABEL)
      continue
    }

    cells.push(picks[pickIndex] ?? '')
    pickIndex += 1
  }

  return chunk(cells, 5)
}

const generateCards = (entries: string[], count: number) =>
  Array.from({ length: count }, () => buildCard(entries))

function App() {
  const [entriesText, setEntriesText] = useState('')
  const [cardCount, setCardCount] = useState('4')
  const [cards, setCards] = useState<string[][][]>([])
  const [view, setView] = useState<'editor' | 'print'>('editor')

  const entries = useMemo(
    () => uniqueEntries(parseEntries(entriesText)),
    [entriesText],
  )
  const requestedCount = Number.parseInt(cardCount, 10)
  const safeCount = Math.max(0, Number.isFinite(requestedCount) ? requestedCount : 0)
  const cardTotal = Math.max(1, safeCount)
  const canGenerate = entries.length >= MIN_ENTRIES && safeCount > 0

  const handleGenerate = () => {
    if (!canGenerate) {
      return
    }

    setCards(generateCards(entries, cardTotal))
    setView('print')
  }

  const handleShuffle = () => {
    if (!canGenerate) {
      return
    }

    setCards(generateCards(entries, cardTotal))
  }

  const sheets = useMemo(() => {
    const groups: string[][][][] = []
    for (let i = 0; i < cards.length; i += 2) {
      groups.push(cards.slice(i, i + 2))
    }
    return groups
  }, [cards])

  return (
    <div className="app">
      <header className="hero screen-only">
        <div className="hero-text">
          <p className="eyebrow">Bingo Card Studio</p>
          <h1>Turn any list into print-ready bingo cards.</h1>
          <p className="lead">
            Paste your prompts, pick the number of cards, and jump straight to a
            printable layout with two cards per A4 sheet.
          </p>
          <div className="pill-row">
            <span className="pill">5x5 layout</span>
            <span className="pill">Free center space</span>
            <span className="pill">2 cards per page</span>
          </div>
        </div>
        <div className="panel hero-panel">
          <h2>Quick setup</h2>
          <ol className="steps">
            <li>Add one entry per line.</li>
            <li>Generate as many cards as you need.</li>
            <li>Print from the ready-made sheet view.</li>
          </ol>
          <div className="stats">
            <div>
              <span className="stat-label">Unique entries</span>
              <span className="stat-value">{entries.length}</span>
            </div>
            <div>
              <span className="stat-label">Cards queued</span>
              <span className="stat-value">{safeCount}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="composer screen-only">
        <div className="panel field">
          <label htmlFor="entries" className="label">
            Entries (one per line)
          </label>
          <textarea
            id="entries"
            placeholder={`Icebreaker question\nCompany value\nWorkshop prompt\nCelebrate a win`}
            value={entriesText}
            onChange={(event) => setEntriesText(event.target.value)}
            rows={14}
          />
          <div className="field-meta">
            <span>{entries.length} unique entries</span>
            <span
              className={`status ${
                entries.length >= MIN_ENTRIES ? 'status-ready' : 'status-warn'
              }`}
            >
              {entries.length >= MIN_ENTRIES
                ? 'Ready to generate'
                : `Add ${MIN_ENTRIES - entries.length} more`}
            </span>
          </div>
        </div>
        <div className="panel controls">
          <div className="field">
            <label htmlFor="cardCount" className="label">
              Number of cards
            </label>
            <input
              id="cardCount"
              type="number"
              min={1}
              max={200}
              value={cardCount}
              onChange={(event) => setCardCount(event.target.value)}
            />
          </div>
          <button
            className="primary"
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate}
          >
            Generate print view
          </button>
          <p className="helper">
            Cards are randomized per sheet. Use "Shuffle cards" in print view
            for a new mix.
          </p>
        </div>
      </section>

      {view === 'print' && (
        <section className="print-view">
          <div className="print-toolbar screen-only">
            <div>
              <p className="eyebrow">Print view</p>
              <h2>Cards ready for A4</h2>
              <p className="lead">
                {cards.length} cards | {entries.length} entries | 2 per page
              </p>
            </div>
            <div className="toolbar-actions">
              <button
                className="ghost"
                type="button"
                onClick={() => setView('editor')}
              >
                Back to editor
              </button>
              <button
                className="ghost"
                type="button"
                onClick={handleShuffle}
              >
                Shuffle cards
              </button>
              <button
                className="primary"
                type="button"
                onClick={() => window.print()}
              >
                Print A4
              </button>
            </div>
          </div>
          <div className="sheets">
            {sheets.map((sheet, sheetIndex) => (
              <div
                className="print-sheet"
                key={`sheet-${sheetIndex}`}
                style={{ ['--delay' as string]: `${sheetIndex * 80}ms` }}
              >
                {sheet.map((card, cardIndex) => (
                  <article
                    className="bingo-card"
                    key={`card-${sheetIndex}-${cardIndex}`}
                  >
                    <div className="card-grid">
                      {card.map((row, rowIndex) =>
                        row.map((cell, cellIndex) => {
                          const isFree = rowIndex === 2 && cellIndex === 2
                          return (
                            <div
                              key={`${rowIndex}-${cellIndex}`}
                              className={`bingo-cell ${
                                isFree ? 'free' : ''
                              }`}
                            >
                              {cell}
                            </div>
                          )
                        }),
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default App
