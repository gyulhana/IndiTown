import SignupForm from '../../components/SignupForm'

export default {
  title: 'Component/SignupForm',
  component: SignupForm,
}

export const Default = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', width: 375, height: 600 }}>
      <SignupForm />
    </div>
  )
}
