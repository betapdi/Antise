import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import SignUpPage from './pages/Register';
import LoginPage from "./pages/Login";

const Authentication = (props) => {
  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<Navigate to = "/auth/register" replace />} />
        <Route path = "register" element = { <SignUpPage />} />
        <Route path = "login" element = { <LoginPage />} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}
export default Authentication

