import Profile from '../Profile'
import Text from '../Text'
import Image from '../Image'
import Progress from '../Progress'
import styled from '@emotion/styled'
import theme from '../../themes'

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`

const ImgWrapper = styled.div`
  width: 100%;
  max-height: 12rem;
  border-radius: 0.8rem;
  margin: 2rem 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

const ContentsDescription = ({
  lazy,
  threshold,
  placeholder,
  alt,
  userImg = 'https://picsum.photos/400',
  userNickName,
  userEmail,
  userTown,
  title,
  progressTargetNum,
  progressResultNum,
  progressTime,
  progressAmount,
  imgSrc,
  createdAt,
  ...props
}) => {
  return (
    <div {...props}>
      <FlexBox
        style={{ marginBottom: '1rem', justifyContent: 'space-between' }}
      >
        <Profile
          lazy={lazy}
          threshold={threshold}
          size="medium"
          src={userImg}
          placeholder={placeholder}
          alt={alt}
          nickName={userNickName}
          email={userEmail}
          town={userTown}
        />
        <svg
          width="6"
          height="24"
          viewBox="0 0 6 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6C4.65 6 6 4.65 6 3C6 1.35 4.65 0 3 0C1.35 0 0 1.35 0 3C0 4.65 1.35 6 3 6ZM3 9C1.35 9 0 10.35 0 12C0 13.65 1.35 15 3 15C4.65 15 6 13.65 6 12C6 10.35 4.65 9 3 9ZM3 18C1.35 18 0 19.35 0 21C0 22.65 1.35 24 3 24C4.65 24 6 22.65 6 21C6 19.35 4.65 18 3 18Z"
            fill="#D8D9D9"
          />
        </svg>
      </FlexBox>

      <Text children={title} size={'h6'} color={theme.colors.gray_6} block />

      <ImgWrapper>
        <Image
          lazy
          block
          src={imgSrc}
          mode="cover"
          style={{ maxWidth: '30rem', borderRadius: '0.8rem' }}
        ></Image>
      </ImgWrapper>

      <FlexBox
        style={{
          marginBottom: '0.5rem',
        }}
      >
        <Progress width="9rem" size="large" children={progressTime} />
        <Text size={14} block strong style={{ marginLeft: '0.6rem' }}>
          남음
        </Text>
      </FlexBox>

      <Progress
        size="medium"
        targetNum={progressTargetNum}
        resultNum={progressResultNum}
        children={progressAmount}
      />

      <Text
        block
        size={12}
        color={theme.colors.gray_3}
        style={{ marginTop: '2rem' }}
      >
        {createdAt}
      </Text>
    </div>
  )
}

export default ContentsDescription
