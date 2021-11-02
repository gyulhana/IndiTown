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

const login = async (userInfo) => {
  return await axiosInstance({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    url: '/login',
    data: JSON.stringify(userInfo),
  })
}

const createContent = async (data) => {
  return await axios({
    method: 'post',
    url: '/posts/create',
    headers: {
      authorization: `Bearer ${data.token}`,
    },
    data: data.content,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response)
    })
}

const getContentDetail = async (contentId) => {
  return await axiosInstance({
    method: 'get',
    url: `/posts/${contentId}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response)
    })
}

const createComment = async (data) => {
  return await axiosInstance({
    method: 'post',
    url: '/comments/create',
    headers: {
      authorization: `Bearer ${data.token}`,
    },
    data: data.comment,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response)
    })
}

const getMessageList = async (token) => {
  return await axiosInstance({
    method: 'get',
    url: '/messages/conversations',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
}

const getMessages = async (data) => {
  return await axiosInstance({
    method: 'get',
    url: '/messages',
    headers: {
      Authorization: `bearer ${data.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      userId: data.contactUserId,
    },
  })
}

const sendMessage = async (data) => {
  return await axiosInstance({
    url: '/messages/create',
    method: 'post',
    headers: {
      Authorization: `bearer ${data.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    data: JSON.stringify(data.messageData),
  })
}

const likePost = async (data) => {
  return await axiosInstance({
    url: '/likes/create',
    method: 'post',
    headers: {
      Authorization: `bearer ${data.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    data: JSON.stringify(data.postId),
  })
}

const dislikePost = async (data) => {
  return await axiosInstance({
    method: 'delete',
    url: '/likes/delete',
    headers: {
      Authorization: `bearer ${data.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    data: JSON.stringify(data.id),
  })
}

export const ApiUtils = {
  getUsersInfo,
  getPostsList,
  login,
  createContent,
  getContentDetail,
  createComment,
  getMessageList,
  getMessages,
  sendMessage,
  likePost,
  dislikePost,
}
