import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Information from './pages/Information';
import Contact from './pages/Contact';
import Facility from './pages/Facility';


const App: React.FC = () => (
<div className="min-h-screen flex flex-col bg-white text-emerald-950">
<Header />
<main className="flex-1">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/information" element={<Information />} />
<Route path="/facility" element={<Facility />} />
<Route path="/contact" element={<Contact />} />
</Routes>
</main>
<Footer />
</div>
);


export default App;