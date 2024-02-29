import axios from "axios"

export const getEmployees = () => axios.get("http://localhost:5152/employees")

export const deleteEmployee = (id) =>
  axios.delete(`http://localhost:5152/employee/${id}`)

export const editEmployee = (data) =>
  axios.put(`http://localhost:5152/employee/${data.id}`, data)

export const addEmployee = (data) =>
  axios.post("http://localhost:5152/employee", data)

export const seedEmployees = () =>
  axios.get("http://localhost:5152/seed-employees")
