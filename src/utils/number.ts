/**
 * Transorm number to string spaced number
 * ex: 12452 -> 12 452
 * @param value Number to transform
 * @returns Transformed number as string
 */
export function numberWithSpaces(value: number) {
  const parts = value.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join('.')
}
