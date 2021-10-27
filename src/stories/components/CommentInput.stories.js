import CommentInput from '../../components/CommentInput'

export default {
  title: 'Component/CommentInput',
  component: CommentInput,
  argTypes: {
    lazy: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    threshold: {
      type: { name: 'number' },
      defaultValue: 0.5,
      control: { type: 'number' },
    },
    userImg: {
      type: { name: 'string', required: true },
      defaultValue: 'https://picsum.photos/200',
      control: { type: 'text' },
    },
    imgPlaceholder: {
      type: { name: 'string', required: true },
      defaultValue: 'https://via.placeholder.com/200',
      control: { type: 'text' },
    },
    textPlaceholder: {
      type: { name: 'string', required: true },
      defaultValue: 'text...',
      control: { type: 'text' },
    },
  },
}

export const Default = (arg) => {
  return <CommentInput {...arg} />
}
