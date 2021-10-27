import Progress from '../../components/Progress'

export default {
  title: 'Component/Progress',
  component: Progress,
  argTypes: {
    size: {
      defaultValue: 'medium',
      options: ['medium', 'large'],
      control: { type: 'inline-radio' },
    },
    width: {
      control: { type: 'range', min: 120, max: 600 },
    },
    targetNum: {
      control: { type: 'range', min: 1, max: 100 },
    },
    resultNum: {
      control: { type: 'range', min: 1, max: 100 },
    },
    children: {
      defaultValue: '00 : 28 : 49',
      control: { type: 'text' },
    },
  },
}

export const Default = (args) => (
  <div>
    <Progress {...args} resultNum={undefined}></Progress>
    <Progress {...args}></Progress>
  </div>
)
