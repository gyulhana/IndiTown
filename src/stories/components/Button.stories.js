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
  },
}

export const Default = (args) => {
  return <Button {...args} />
}
