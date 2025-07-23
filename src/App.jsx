import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/loginform.jsx"
import About from "./pages/about.jsx"
import ForgetPass1 from "./pages/enterEmail.jsx"
import ResetPassword from "./pages/typePass.jsx"
import Register from "./pages/register.jsx"
import { Dashboard } from "./pages/dashboard.jsx"
import Unauth from "./pages/unauth.jsx"
import NotFound from "./pages/notfound"
import Profile from "./pages/profile.jsx"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgetPass1 />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/unauthorized" element={<Unauth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
export default App
