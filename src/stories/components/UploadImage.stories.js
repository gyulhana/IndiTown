import UploadImage from '../../components/UploadImage'

export default {
  title: 'Component/UploadImage',
  component: UploadImage,
  argTypes: {
    children: {
      defaultValue: '클릭 또는 드래그 하여 이미지 파일을 업로드하세요',
      control: { type: 'text' },
    },
  },
}

export const ContentsImage = ({ children }) => {
  return (
    <UploadImage droppable accept={'.png, .jpg, .jpeg, .gif'}>
      {(file) => (
        <div
          style={{
            width: 300,
            height: 100,
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
                  fill="#808080"
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
          {file ? file.name : children}
        </div>
      )}
    </UploadImage>
  )
}

export const UserProfile = () => {
  return (
    <UploadImage
      droppable
      accept={'.png, .jpg, .jpeg, .gif'}
      style={{ borderRadius: '50%' }}
    >
      {
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
          }}
        ></div>
      }
    </UploadImage>
  )
}
