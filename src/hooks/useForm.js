import { useState } from 'react'
import moment from 'moment'

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleRadioChange = (e) => {
    const { name, id } = e.target
    const m = moment()
    let recruitmentDate

    if (id === '30분') {
      recruitmentDate = m.clone().add(30, 'minutes').format()
    } else if (id === '1시간') {
      recruitmentDate = m.clone().add(1, 'hours').format()
    }
    setValues({ ...values, [name]: id, recruitmentDate })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    const newErrors = validate ? validate(values) : {}

    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values)
    }
    setErrors(newErrors)
    setIsLoading(false)
  }

  return {
    values,
    errors,
    isLoading,
    handleRadioChange,
    handleInputChange,
    handleSubmit,
  }
}

export default useForm
