import Signin from '../../components/Signin'

export default {
  title: 'Component/Signin',
  component: Signin,
}

export const Default = (args) => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', width: 375, height: 600 }}>
      <Signin {...args} />
    </div>
  )
}
