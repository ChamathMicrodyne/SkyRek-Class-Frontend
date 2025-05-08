import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import AdminPage from "./pages/adminPage";
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
