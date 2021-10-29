import Chat from '../../components/Chat'

export default {
  title: 'Component/Chat',
}

export const SendMessage = () => {
  return (
    <Chat.SendMessage>
      동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 동해 물과
      백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 동해 물과 백두산이
      마르고 닳도록 하느님이 보우하사 우리나라 만세 동해 물과 백두산이 마르고
      닳도록 하느님이 보우하사 우리나라 만세
    </Chat.SendMessage>
  )
}

export const ReceiveMessage = () => {
  return (
    <Chat.ReceiveMessage>
      동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 동해 물과
      백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 동해 물과 백두산이
      마르고 닳도록 하느님이 보우하사 우리나라 만세 동해 물과 백두산이 마르고
      닳도록 하느님이 보우하사 우리나라 만세
    </Chat.ReceiveMessage>
  )
}

export const ChattingDate = () => {
  return <Chat.ChattingDate>10월 19일</Chat.ChattingDate>
}

export const ChattingRoom = () => {
  return (
    <div style={{ width: 375, height: 600, border: '2px solid' }}>
      <Chat.ChattingRoom />
    </div>
  )
}
