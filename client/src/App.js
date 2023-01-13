import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import { Login } from "./pages/login";
import { Navbar } from "./pages/navbar";
import {Routes, Route, Navigation, BrowserRouter} from "react-router-dom"

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/profile/:userID" element={<Profile/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
