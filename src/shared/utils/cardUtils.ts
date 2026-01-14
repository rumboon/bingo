export const FREE_LABEL = '☺'
export const MIN_ENTRIES = 24

export const parseEntries = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

export const uniqueEntries = (entries: string[]) => Array.from(new Set(entries))

export const shuffle = <T>(items: T[]): T[] => {
  const array = [...items]
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const chunk = <T>(items: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size))
  }
  return result
}

export const buildCard = (entries: string[]): string[][] => {
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

export const generateCards = (entries: string[], count: number): string[][][] =>
  Array.from({ length: count }, () => buildCard(entries))
