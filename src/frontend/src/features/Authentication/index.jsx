import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import SignUpPage from './pages/Register';
import LoginPage from "./pages/Login";
import WelcomeEmployee from "./pages/Welcome/WelcomeEmployee";
import WelcomeEmployer from "./pages/Welcome/WelcomeEmployer";


const Authentication = (props) => {
  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<Navigate to = "/auth/register" replace />} />
        <Route path = "register" element = { <SignUpPage />} />
        <Route path = "welcomeemployee" element = {<WelcomeEmployee />} />
        <Route path = "welcomeemployer" element = {<WelcomeEmployer />} />
        <Route path = "login" element = { <LoginPage />} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}
export default Authentication

