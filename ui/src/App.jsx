import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Video from "./pages/Video/Video.jsx";
import {Routes, Route} from "react-router-dom";
import {useState} from "react";

function App() {

    const [sidebar, setSidebar] = useState(true);

  return (
    <>
        <Navbar setSideBar={setSidebar}/>
        <Routes>
            <Route path="/" element={<Home sidebar={sidebar} />} />
            <Route path="/video/:categoryId/:videoId" element={<Video />} />
        </Routes>
    </>
  )
}

export default App
