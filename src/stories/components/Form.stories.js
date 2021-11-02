import Form from '../../components/Form'

export default {
  title: 'Component/Form',
  component: Form,
  argTypes: {
    placeholder: { control: { type: 'text' } },
  },
}

export const Default = (args) => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: 20 }}>
      <h1>Default Form</h1>
      <Form type="id" {...args} />
      <br />
      <Form type="password" {...args} />
      <br />
      <Form type="email" {...args} />
      <br />
      <Form type="search" {...args} />
      <br />
    </div>
  )
}

export const Large = (args) => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: 20 }}>
      <h1>Large Form</h1>
      <Form large type="id" {...args} />
      <br />
      <Form large type="password" {...args} />
      <br />
      <Form large type="email" {...args} />
      <br />
      <Form large type="search" {...args} />
    </div>
  )
}
