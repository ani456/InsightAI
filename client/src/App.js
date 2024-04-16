import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import Navbar from "./components/Navbar";
import Homepage from "./pages/homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const theme = useMemo(() => createTheme(themeSettings(), []));
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>{" "}
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />{" "}
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/Login" element={<Login />} />{" "}
      </Routes>{" "}
    </>
  );
}

export default App;
