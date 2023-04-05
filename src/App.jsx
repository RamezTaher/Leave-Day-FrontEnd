import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import EmployeeLeaveRequest from "./pages/EmployeeLeaveRequest"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<SignUp />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/platform/dashboard" element={<EmployeeDashboard />} />
        <Route
          path="/platform/leave-request/:id"
          element={<EmployeeLeaveRequest />}
        />
      </Routes>
    </>
  )
}

export default App
