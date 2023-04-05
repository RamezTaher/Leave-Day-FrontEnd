import React, { useState } from "react"

const Header = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")).employee
  )
  return (
    <header className="h-[70px] bg-blue-400  text-white text-xl">
      <div className="flex justify-between items-center container sm:mx-auto h-full">
        <div>ISIMM Leave Day</div>
        <div>Hello {user.name}</div>
      </div>
    </header>
  )
}

export default Header
