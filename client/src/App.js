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
import { PageNotFound } from "./pages/Error/404";



function App() {

  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(configurationTheme(mode)), [mode]);
  const userToken = useSelector(state => state.token);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={ <Login/> }/>
            <Route path="/profile/:userId" element={userToken ? <Profile/> : <Navigate to='/'/>} />
            <Route path="/home" element={ userToken ? <Home/> : <Navigate to='/'/>}/>
            <Route path="*" element={<PageNotFound/>}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
