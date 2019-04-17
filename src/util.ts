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

export const convertStringToMSX = (text: string) => {
  const tableBaseValue = 128
  const table = 
    "Çüéâäà.çêëèïîìÄÁ" +
    "ÉæÆôöòûùÿÖÜ....." +
    "áíóúñÑ.........." +
    "Ãã..Õõ"

  const regularExpression = /[ÇüéâäàçêëèïîìÄÁÉæÆôöòûùÿÖÜáíóúñÑÃãÕõ]/g

  return text.replace(regularExpression, (char) => {
    const index = table.indexOf(char)
    return index >= 0 ? String.fromCharCode(tableBaseValue + index) : char
  })
}
