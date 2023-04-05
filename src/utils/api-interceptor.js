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
export const getDepartments = () => axios.get(`${API_URL}/department`, config)
export const getDepartmentById = (id) =>
  axios.get(`${API_URL}/department/${id}`, config)

// Leave Request
export const getLeaveRequestByEmployee = (id) =>
  axios.get(`${API_URL}/leave-request/employee/${id}`, config)

export const postLeaveRequest = (data) =>
  axios.post(`${API_URL}/leave-request`, data, config)

// Leave Type
export const getLeaveTypes = () => axios.get(`${API_URL}/leave-type`, config)
export const getLeaveTypeById = (id) =>
  axios.get(`${API_URL}/leave-type/${id}`, config)

// Employee
export const getEmployeeById = (id) =>
  axios.get(`${API_URL}/employee/${id}`, config)
