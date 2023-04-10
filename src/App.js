import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from './contexts/notes/NoteState'
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const[alert ,setAlert] = useState(null)
  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    },2000)
  }
  return (
    <>
   
      <NoteState>
        <BrowserRouter>
        
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
          </Routes>
          <Routes>
            <Route exact path="/about" element={<About />} />
          </Routes>
          <Routes>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          </Routes>
          <Routes>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    
    </>
  );
}

export default App;
