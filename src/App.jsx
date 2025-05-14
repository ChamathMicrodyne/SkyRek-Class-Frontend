import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-right"/>
        {/* <Header/> */}
        <Routes path="/*">
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/*" element={<h2>404 Not Found!</h2>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
