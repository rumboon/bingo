export const FREE_LABEL = '☺'

export const hasFreeSpace = (gridSize: number, includeFree: boolean) =>
  includeFree && gridSize % 2 === 1

export const getRecommendedEntries = (gridSize: number, includeFree: boolean) => {
  const safeSize = Number.isFinite(gridSize) ? Math.max(1, Math.floor(gridSize)) : 5
  const totalCells = safeSize * safeSize
  return totalCells - (hasFreeSpace(safeSize, includeFree) ? 1 : 0)
}

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

export const buildCard = (
  entries: string[],
  gridSize: number,
  includeFree: boolean,
): string[][] => {
  const picks = shuffle(entries).slice(0, getRecommendedEntries(gridSize, includeFree))
  const cells: string[] = []
  let pickIndex = 0
  const totalCells = gridSize * gridSize
  const centerIndex = Math.floor(totalCells / 2)

  for (let i = 0; i < totalCells; i += 1) {
    if (hasFreeSpace(gridSize, includeFree) && i === centerIndex) {
      cells.push(FREE_LABEL)
      continue
    }

    cells.push(picks[pickIndex] ?? '')
    pickIndex += 1
  }

  return chunk(cells, gridSize)
}

export const generateCards = (
  entries: string[],
  count: number,
  gridSize: number,
  includeFree: boolean,
): string[][][] =>
  Array.from({ length: count }, () => buildCard(entries, gridSize, includeFree))
