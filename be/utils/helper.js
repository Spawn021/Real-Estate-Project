export const generateKeyRedis = (filter) => {
  return JSON.stringify(filter)
    .replace(/\W/g, '')
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('')
}
