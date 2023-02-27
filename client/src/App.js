import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import { Login } from "./pages/login";
import { Navbar } from "./pages/navbar";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom"
import configurationTheme from "./theme";
import { createTheme, ThemeProvider} from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from "react-redux";
import { useMemo } from "react";



function App() {

  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(configurationTheme(mode)), [mode]);
  const userToken = useSelector(state => state.token);

  console.log(mode);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={ <Login/> }/>
            <Route path="/profile/:userID" element={userToken ? <Profile/> : <Navigate to='/'/>} />
            <Route path="/home" element={ userToken ? <Home/> : <Navigate to='/'/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
