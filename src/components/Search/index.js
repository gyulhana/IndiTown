import Form from '../Form'

const request = () => {}

const handleKeyPress = (e) => {}

const Search = ({ args }) => {
  return <Form type="search" onKeyPress={handleKeyPress} {...args} />
}

export default Search
