const pixelToRem = (size) => `${size / 16}rem`

// const fontSizes = {
//   h1: pixelToRem(40),
//   h2: pixelToRem(32),
//   h3: pixelToRem(28),
//   h4: pixelToRem(24),
//   h5: pixelToRem(20),
//   h6: pixelToRem(16),
//   sm: pixelToRem(14),
//   xs: pixelToRem(12),
// }

const fontSizes = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  sm: 'sm',
  xs: 'xs',
}

const colors = {
  gray_1: '#F5F5F5',
  gray_2: '#E8E8E8',
  gray_3: '#D8D9D9',
  gray_4: '#B0B0B0',
  gray_5: '#808080',
  gray_6: '#505050',
  gray_7: '#333333',
  primary: '#F6B545',
  success: '#198754',
  warning: '#DC3545',
}

const theme = {
  pixelToRem,
  fontSizes,
  colors,
}

export default theme
