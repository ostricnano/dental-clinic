import FormSignIn from "./components/login/FormSignIn"
import FormLogIn from "./components/login/FormLogIn"
import Home from './routes/Home'
import Dentists from './routes/Dentists'
import Clients from './routes/Clients'
import Appointments from './routes/Appointments'
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./utils/authContext"
import './App.css'

function App() {

  return (
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<FormLogIn />} />
            <Route path="/signin" element={<FormSignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path='/dentists' element={<Dentists />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path="*" element={<h1>404: Not Found</h1>} />
          </Routes> 
        </div>
      </AuthProvider>
  )
}

export default App
