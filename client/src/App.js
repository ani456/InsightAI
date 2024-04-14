import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Homepage from "./pages/homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    return ( <
        div >
        <
        Navbar / >
        <
        Routes >
        <
        Route path = "/"
        element = { < Homepage / > }
        /> <
        Route path = "/register"
        element = { < Register / > }
        /> <
        Route path = "/Login"
        element = { < Login / > }
        /> <
        /Routes> <
        /div>
    );
}

export default App;