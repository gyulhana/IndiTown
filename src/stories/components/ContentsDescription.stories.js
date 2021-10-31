import ContentsDescription from '../../components/ContentsDescription'

export default {
  title: 'Component/ContentsDescription',
  component: ContentsDescription,
  argTypes: {
    title: {
      defaultValue:
        '배구파요 같이시켜요.....배구파요 같이시켜요.....배구파요 같이시켜요.....배구파요 같이시켜요.....',
      control: { type: 'text' },
    },
    userNickName: {
      defaultValue: '가양동식충벌레',
      control: { type: 'text' },
    },
    userEmail: {
      defaultValue: 'correctid@naver.com',
      control: { type: 'text' },
    },
    userTown: {
      defaultValue: '강서구 화곡동',
      control: { type: 'text' },
    },
    imgSrc: {
      defaultValue:
        'https://www.kgnews.co.kr/data/photos/20210207/art_16136995175517_410139.png',
      control: { type: 'text' },
    },
    progressTargetNum: {
      control: { type: 'range', min: 1, max: 100 },
    },
    progressResultNum: {
      control: { type: 'range', min: 1, max: 100 },
    },
    progressTime: {
      defaultValue: '00 : 28 : 49',
      control: { type: 'text' },
    },
    progressAmount: {
      defaultValue: '￦ 5,100원 남음',
      control: { type: 'text' },
    },
    createdAt: {
      defaultValue: '2021년 10월 21일  14:00',
      control: { type: 'text' },
    },
  },
}

export const Default = (arg) => {
  return (
    <div style={{ width: 375 }}>
      <ContentsDescription {...arg} />
    </div>
  )
}
