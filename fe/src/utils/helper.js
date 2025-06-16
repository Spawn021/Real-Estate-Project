export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    return ''
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
export const renderRangeNumbers = (start, end) => {
  if (typeof start !== 'number' || typeof end !== 'number') {
    return []
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
