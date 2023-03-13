import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../src/CSS/shared.css';

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import LandPlots from "./pages/LandPlots";
import CropView from "./pages/CropView";

export default function App() {
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
  <App />
);