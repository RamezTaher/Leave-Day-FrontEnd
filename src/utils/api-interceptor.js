import axios from "axios"

const API_URL = import.meta.env.VITE_API
console.log(API_URL)

const api = axios.create({ baseURL: API_URL })
const config = { withCredentials: true }

// Auth
export const postRegisterUser = (data) =>
  api.post(`/auth/register`, data, config)

export const postLogUser = (data) => api.post(`/auth/login`, data, config)

// Departments

// Channels

export const getDepartments = () => axios.get(`${API_URL}/department`, config)
