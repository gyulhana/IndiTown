const profileImages = [
  '/image/profile_01.png',
  '/image/profile_02.png',
  '/image/profile_03.png',
  '/image/profile_04.png',
  '/image/profile_05.png',
]
const getDefaultImage = (email) => {
  return email && profileImages[Math.floor(email.length % profileImages.length)]
}

export const ProfileUtils = { getDefaultImage }
