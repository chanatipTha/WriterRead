import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPass from './Component/Forgot/ForgotPass.js';
import Signup from './Component/Login/Signup';
import Login from './Component/Login/Login';

function App() {
  return (
    <div>
      <Signup/>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="forgotpass" element={<ForgotPass />}></Route>
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
