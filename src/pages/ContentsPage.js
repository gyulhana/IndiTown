import axios from 'axios'
import { useCallback } from 'react'
import { useAsync } from '../hooks'
import ContentsProvider from '../contexts/ContentsProvider'
import ContentsSummaryList from '../components/ContentsSummaryList'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 5.8rem;
  right: 2rem;
`

const ContentsPage = ({ subMenu }) => {
  const API_END_POINT = 'http://13.209.30.200'
  const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNzc5OTliNDdlYzMzMjlkNDM0YjkwYyIsImVtYWlsIjoiYUBhLmEifSwiaWF0IjoxNjM1MzE2OTY1fQ._m_M1OchkSKUL88dxYwFlNITRgYDjodN9cQdL3RHyWY`

  const initialContents = useAsync(async () => {
    return await axios
      .get(`${API_END_POINT}/posts/channel/616a205422996f0bc94f6e23`)
      .then((response) => response.data)
  }, [])

  const handleAddContent = useCallback(
    async (content) => {
      return await axios({
        method: 'post',
        url: `${API_END_POINT}/posts/create`,
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        data: content,
      }).then((response) => response.data)
    },
    [TOKEN]
  )

  const handleDeleteContent = useCallback(
    async (id) => {
      return await axios({
        method: 'delete',
        url: `${API_END_POINT}/posts/delete`,
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        data: {
          id,
        },
      }).then(() => ({ id }))
    },
    [TOKEN]
  )
  console.log(initialContents.value)
  return (
    <ContentsProvider
      initialContents={initialContents.value?.filter(
        (content) => JSON.parse(content.title).type === subMenu
      )}
      handleDeleteContent={handleDeleteContent}
      handleAddContent={handleAddContent}
    >
      <div>
        {initialContents.isLoading ? (
          <div>Loading...</div>
        ) : (
          <ContentsSummaryList />
        )}
      </div>
      <Link to={`/content/${subMenu}/edit`}>
        <ButtonWrapper>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_389:401)">
              <circle cx="50" cy="42" r="34" fill="#F6B545" />
            </g>
            <path
              d="M36 50.4941V55.2223C36 55.6578 36.3422 56 36.7777 56H41.5059C41.7081 56 41.9103 55.9222 42.0503 55.7667L59.0346 38.7979L53.2021 32.9654L36.2333 49.9342C36.0778 50.0897 36 50.2763 36 50.4941ZM63.5451 34.2875C64.1516 33.6809 64.1516 32.701 63.5451 32.0944L59.9056 28.4549C59.299 27.8484 58.3191 27.8484 57.7125 28.4549L54.8663 31.3012L60.6988 37.1337L63.5451 34.2875Z"
              fill="#F5F5F5"
            />
            <defs>
              <filter
                id="filter0_d_389:401"
                x="0"
                y="0"
                width="100"
                height="100"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="8" />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.2 0 0 0 0 0.2 0 0 0 0 0.2 0 0 0 0.2 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_389:401"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_389:401"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </ButtonWrapper>
      </Link>
    </ContentsProvider>
  )
}

export default ContentsPage
