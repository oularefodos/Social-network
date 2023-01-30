import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import { Login } from "./pages/login";
import { Navbar } from "./pages/navbar";
import {Routes, Route, Navigation, BrowserRouter} from "react-router-dom"
import configurationTheme from "./theme";
import { createTheme, ThemeProvider} from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from "react-redux";
import { useMemo } from "react";



function App() {

  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(configurationTheme(mode)), [mode]);

  console.log(mode);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/profile/:userID" element={<Profile/>}/>
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
