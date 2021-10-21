import Form from '../../components/Form'

export default {
  title: 'Component/Form',
  component: Form,
}

export const Default = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: 20 }}>
      <h1>Default Form</h1>
      <Form type="id" />
      <br />
      <Form type="password" />
      <br />
      <Form type="email" />
      <br />
      <Form type="search" />
      <br />
    </div>
  )
}

export const Large = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: 20 }}>
      <h1>Large Form</h1>
      <Form large type="id" />
      <br />
      <Form large type="password" />
      <br />
      <Form large type="email" />
      <br />
      <Form large type="search" />
    </div>
  )
}
