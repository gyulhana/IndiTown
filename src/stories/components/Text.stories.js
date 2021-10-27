import Text from '../components/Text'

export default {
  title: 'Component/Text',
  component: Text,
  argTypes: {
    size: { control: 'number' },
    strong: { control: 'boolean' },
    color: { control: 'color' },
    block: { control: 'color' },
    paragraph: { control: 'boolean' },
  },
}

export const Default = (args) => {
  return (
    <>
      <Text {...args}>Text</Text>
    </>
  )
}
export const Size = (args) => {
  return (
    <>
      <Text size="large" {...args}>
        large
      </Text>
      <Text size="normal" {...args}>
        normal
      </Text>
      <Text size="small" {...args}>
        small
      </Text>
      <Text size="24" {...args}>
        custom
      </Text>
    </>
  )
}
