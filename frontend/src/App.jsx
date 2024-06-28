import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import CardOrder from "./components/CardOrder/CardOrder";
import HomePage from "./components/HomePage/HomePage";
import ModalOrder from "./components/CardOrder/ModalCardOrder";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
