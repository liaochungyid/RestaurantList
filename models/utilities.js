function LCandRS(string) {
  // combination of tolowerCase and remove spacing
  return string.toLowerCase().split(' ').join('')
}

module.exports = LCandRS