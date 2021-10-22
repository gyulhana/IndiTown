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
      defaultValue: 70,
      control: { type: 'range', min: 50, max: 100 },
    },
  },
}

export const Default = (args) => {
  return <Button {...args} />
}
