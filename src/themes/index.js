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
  h1: '2.5rem',
  h2: '2rem',
  h3: '1.75rem',
  h4: '1.5rem',
  h5: '1.25rem',
  h6: '1rem',
  sm: '0.875rem',
  xs: '0.75rem',
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
