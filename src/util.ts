export const wordwrap = (text: string, maxLineLength: number, brk: string) => {
  const words = text.replace(/[\r\n]+/g, ' ').split(' ')
  let lineLength = 0
  return words.reduce((result, word) => {
    if (lineLength + word.length >= maxLineLength) {
      lineLength = word.length
      return result + `${brk}${word}`
    } else {
      lineLength += word.length + (result ? 1 : 0)
      return result ? result + ` ${word}` : `${word}`
    }
  }, '')
}
