import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'

const ContentsContext = createContext()
export const useContentsContext = () => useContext(ContentsContext)

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_CONTENTS': {
      return action.payload
    }
    case 'ADD_CONTENT': {
      return [action.payload, ...state]
    }
    case 'DELETE_CONTENT': {
      const payload = action.payload
      return state.filter((item) => item._id !== payload.id)
    }
    default: {
      console.error('Wrong type')
      break
    }
  }
}

const ContentsProvider = ({
  children,
  initialContents,
  handleDeleteContent,
  handleAddContent,
}) => {
  const [contents, dispatch] = useReducer(reducer, initialContents || [])
  useEffect(() => {
    dispatch({ type: 'INIT_CONTENTS', payload: initialContents || [] })
  }, [initialContents])

  const onAddContent = useCallback(
    async (content) => {
      const payload = await handleAddContent(content)
      dispatch({ type: 'ADD_CONTENT', payload })
    },
    [handleAddContent]
  )

  const onDeleteContent = useCallback(
    async (id) => {
      const payload = await handleDeleteContent(id)
      dispatch({ type: 'DELETE_CONTENT', payload })
    },
    [handleDeleteContent]
  )

  return (
    <ContentsContext.Provider
      value={{
        contents,
        onDeleteContent,
        onAddContent,
      }}
    >
      {children}
    </ContentsContext.Provider>
  )
}

export default ContentsProvider
