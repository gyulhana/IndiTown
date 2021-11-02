import Text from '../../components/Text'

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
      <Text size="h1" {...args}>
        h1
      </Text>
      <Text size="h2" {...args}>
        h2
      </Text>
      <Text size="h3" {...args}>
        h3
      </Text>
      <Text size="h4" {...args}>
        h4
      </Text>
      <Text size="h5" {...args}>
        h5
      </Text>
      <Text size="h6" {...args}>
        h6
      </Text>
      <Text size="12" {...args}>
        custom
      </Text>
    </>
  )
}
