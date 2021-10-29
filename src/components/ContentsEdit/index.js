import Profile from '../Profile'
import UploadImage from '../UploadImage'
import styled from '@emotion/styled'
import theme from '../../themes'

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 16rem;
  outline: none;
  border: none;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  overflow-y: scroll;
  -ms-overflow-style: none;
  font-size: 1.25rem;
  margin: 1rem 0;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.gray_3};
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::placeholder {
    font-size: 1.25rem;
    color: ${theme.colors.gray_3};
  }
`

const ContentsEdit = ({
  lazy,
  threshold,
  placeholder,
  size = 'medium',
  alt,
  userImg = 'https://picsum.photos/400',
  userNickName,
  userEmail,
  userTown,
  title,
  contents,
  progressTargetNum,
  progressResultNum,
  progressTime,
  progressAmount,
  ...props
}) => {
  return (
    <div>
      <Profile
        lazy={lazy}
        threshold={threshold}
        size={size}
        src={userImg}
        placeholder={placeholder}
        alt={alt}
        nickName={userNickName}
        email={userEmail}
        town={userTown}
      />
      <StyledTextarea placeholder="무엇을 함께 주문하고 싶으신가요?" />
      <UploadImage
        droppable
        accept={'.png, .jpg, .jpeg, .gif'}
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        {(file) => (
          <div
            style={{
              padding: '0 2rem',
              height: '6.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div>
              <svg
                width="51"
                height="47"
                viewBox="0 0 51 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_407:1064)">
                  <path
                    d="M40.1685 9.79167V37.2083H10.8993V9.79167H40.1685ZM40.1685 5.875H10.8993C8.59961 5.875 6.71802 7.6375 6.71802 9.79167V37.2083C6.71802 39.3625 8.59961 41.125 10.8993 41.125H40.1685C42.4682 41.125 44.3498 39.3625 44.3498 37.2083V9.79167C44.3498 7.6375 42.4682 5.875 40.1685 5.875ZM30.0079 23.2258L23.7359 30.8046L19.2619 25.7325L12.99 33.2917H38.0778L30.0079 23.2258Z"
                    fill={theme.colors.gray_4}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_407:1064">
                    <rect
                      width="50.1757"
                      height="47"
                      fill="white"
                      transform="translate(0.446045)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {file
              ? file.name
              : '클릭 또는 드래그 하여 이미지 파일을 업로드하세요'}
          </div>
        )}
      </UploadImage>
    </div>
  )
}

export default ContentsEdit
