export const FormatVND = (str) => {
  if (typeof str !== 'string') {
    let toStr = String(str)

    if (toStr.split('.')[1] !== undefined) {
      return (
        toStr
          .split('.')[0]
          .split('')
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + '.') + prev
          }) +
        '.' +
        toStr.split('.')[1]
      )
    } else {
      return toStr
        .split('')
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + '.') + prev
        })
    }
  }
}
