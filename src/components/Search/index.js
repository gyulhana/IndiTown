import Form from '../Form'

const handleKeyPress = (e) => {}

const Search = ({ args }) => {
  return <Form type="search" onKeyPress={handleKeyPress} {...args} />
}

export default Search
