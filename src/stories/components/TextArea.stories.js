import TextArea from '../../components/TextArea'

export default {
  title: 'Component/TextArea',
  component: TextArea,
  argTypes: {
    placeholder: { control: 'text', defaultValue: 'Text...' },
    width: { control: { type: 'range', min: 200, max: 600 } },
  },
}

export const Default = (args) => <TextArea {...args} />
