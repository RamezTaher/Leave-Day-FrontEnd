import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { postLogUser } from "../utils/api-interceptor"
import Loader from "../components/Loader"

const Signin = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const signInHandler = async (event) => {
    event.preventDefault()
    setError("")
    if (email === "" || password === "") {
      setError("All fields are required!")
      return
    }

    try {
      setLoading(true)
      const user = await postLogUser({ email, password })
      localStorage.setItem("userInfo", JSON.stringify(user.data))
      setLoading(false)
      navigate("/platform/dashboard")
    } catch (error) {
      setLoading(false)
      console.log(error)
      setError(error.response.data)
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
            <form onSubmit={signInHandler} className="flex flex-col gap-3">
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                />
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

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
                >
                  Sign In
                </button>
              </div>
              <div className="flex items-center gap-1">
                Don't have an account
                <Link to={"/auth/register"} className="text-blue-500">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin
