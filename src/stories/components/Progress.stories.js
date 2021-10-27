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
    <svg
      width="23"
      height="21"
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 18.375C16.2635 18.375 20.125 14.8492 20.125 10.5C20.125 6.15076 16.2635 2.625 11.5 2.625C6.73654 2.625 2.875 6.15076 2.875 10.5C2.875 14.8492 6.73654 18.375 11.5 18.375Z"
        stroke="#DC3545"
      />
      <path
        d="M11.1167 6.30029H11.8834L11.5 11.3753L11.1167 6.30029Z"
        stroke="#DC3545"
        stroke-linejoin="round"
      />
      <path
        d="M11.4999 15.4003C12.135 15.4003 12.6499 14.9302 12.6499 14.3503C12.6499 13.7704 12.135 13.3003 11.4999 13.3003C10.8647 13.3003 10.3499 13.7704 10.3499 14.3503C10.3499 14.9302 10.8647 15.4003 11.4999 15.4003Z"
        fill="#DC3545"
      />
    </svg>
  </div>
)
