import Button from '../components/Button'

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
    large: {
      control: { type: 'boolean' },
    },
    size: {
      defaultValue: 50,
      control: { type: 'range', min: 20, max: 100 },
    },
  },
}

export const Default = (args) => {
  return <Button {...args} />
}
