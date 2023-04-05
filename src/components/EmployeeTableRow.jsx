import React, { useEffect, useState } from "react"
import { getDepartmentById } from "../utils/api-interceptor"
import { format, parseISO } from "date-fns"

const EmployeeTableRow = ({ info }) => {
  console.log(info)
  const [department, setDepartment] = useState({})

  useEffect(() => {
    getDepartmentById(info.department)
      .then(({ data }) => {
        setDepartment(data)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <tr>
      <td>{info?._id}</td>
      <td>{info?.name}</td>
      <td>{info?.leaveDaysLeft} Day</td>
      <td>{info?.department}</td>
      <td>{department?.name}</td>
      <td>{info?.phone}</td>
      <td>{info?.email}</td>
      <td>{format(parseISO(info?.createdAt), "dd/MM/yyyy")}</td>
    </tr>
  )
}

export default EmployeeTableRow
