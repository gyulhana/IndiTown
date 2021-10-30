import Button from '../../components/Button'

export default {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    children: {
      defaultValue: 'Primary',
      control: { type: 'text' },
    },
    primary: {
      control: { type: 'boolean' },
    },
    size: {
      defaultValue: 'medium',
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
    },
  },
}

export const Default = (args) => {
  return (
    <div>
      <Button {...args} size="small" />
      <Button {...args} size="medium" />
      <Button {...args} size="large" />
    </div>
  )
}
