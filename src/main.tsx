import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import global styles before components
import "animate.css";
import "./styles/style.scss";

// higher order components
import ThemeProvider from "./components/theme-provider";

// page components
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Quote from "./pages/quote";

const App: React.FC = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="quote" element={<Quote />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
