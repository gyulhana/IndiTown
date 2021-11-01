import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SNS_API_END_POINT,
})

const getUsersInfo = async (userId) => {
  return await axiosInstance({
    method: 'get',
    url: `users/${userId}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response)
    })
}

const getPostsList = async () => {
  return await axiosInstance({
    method: 'get',
    url: `/posts/channel/${process.env.REACT_APP_SNS_CHANNEL_ID}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response)
    })
}

export const ApiUtils = {
  getUsersInfo,
  getPostsList,
}
