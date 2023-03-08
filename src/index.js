import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../src/CSS/shared.css';

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import LandPlots from "./pages/LandPlots";
import CropView from "./pages/CropView";

export default function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://sampledata.elancoapps.com/data',{
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin" : "http://localhost:3000",
        "Origin" : "http://localhost:3000"
      }
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="landplots" element={<LandPlots />} />
          <Route path="cropview" element={<CropView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);