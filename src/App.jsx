import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Header from "./components/header.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes path="/*">
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/*" element={<h2>404 Not Found!</h2>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
