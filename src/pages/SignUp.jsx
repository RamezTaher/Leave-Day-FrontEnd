import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { validateEmail } from "../utils/validator"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { getDepartments, postRegisterUser } from "../utils/api-interceptor"

const Signup = () => {
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")

  const matchPassword = confirmPassword === password
  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  )

  useEffect(() => {
    getDepartments()
      .then(({ data }) => {
        setDepartments(data)
        setDepartment(data[0]._id)
      })
      .catch((err) => console.log(err))
  }, [])

  const signupHandler = async (event) => {
    event.preventDefault()
    setError("")
    if (
      name === "" ||
      phone === "" ||
      email === "" ||
      department === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("All fields are required!")
      return
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email")
      return
    }

    if (!isPasswordValid) {
      setError(
        "Password must be 8 characters long, have one upper and lower case character and one number."
      )
      return
    }
    if (!matchPassword) {
      setError("Both passwords must be same")
      return
    }

    try {
      setLoading(true)
      const user = await postRegisterUser({
        name,
        email,
        department,
        password,
        phone,
      })
      if (user) {
        setLoading(false)
        navigate("/auth/login")
      }
    } catch (error) {
      setLoading(false)
      setError(error.response.data)
      console.log(error)
    }
  }
  return (
    <>
      {loading && (
        <div className="h-screen w-screen bg-black bg-opacity-80 absolute flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-700 z-1 filter ">
        <div className="text-center ">
          <h1 className="text-4xl font-semibold mb-4 font-mono text-white">
            Join ISIMM Leave Day.
          </h1>
          {error !== "" && (
            <p className="text-white font-meduim max-w-sm">{error}</p>
          )}

          <div className="bg-white p-5 text-left rounded-xl mt-1 shadow-lg">
            <form onSubmit={signupHandler} className="flex flex-col gap-3">
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  value={name}
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                />
              </label>
              <label htmlFor="phone">
                Phone
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  value={phone}
                />
              </label>
              <label htmlFor="department">
                Department
                <select onChange={(e) => setDepartment(e.target.value)}>
                  {departments.map((department, idx) => (
                    <option key={idx} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="password" className="relative">
                Password
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  value={password}
                />
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPassword(false)}
                    className="text-2xl cursor-pointer absolute right-3 top-1/2 translate-y-[2px] "
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setShowPassword(true)}
                    className="text-2xl cursor-pointer absolute right-3 top-1/2 translate-y-[2px]"
                  />
                )}
              </label>

              <label htmlFor="confirm-password">
                Password
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Password"
                  value={confirmPassword}
                />
              </label>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
