import { Route,Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

 export default function App() {
  return(
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/users" element={<MainPage/>}/>
    </Routes>
  )
}