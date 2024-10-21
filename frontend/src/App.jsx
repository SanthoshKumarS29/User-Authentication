import { Route, Router,Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./components/Home"
import Otp from "./pages/Otp_Verify"



function App() {

  return (
    <>
      <>
        <div>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Otp-verify' element={<Otp />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </div>
      </>
    </>
  )
}

export default App
