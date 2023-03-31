import {BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Account from "./pages/Account";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Manufacturer from "./pages/manufacturer/Manufacturer";
import AddManufacturer from "./pages/manufacturer/AddManufacturer";
import ManufacturerInfo from "./pages/manufacturer/ManufacturerInfo";
import Product from "./pages/Product";
import ProductInfo from "./pages/ProductInfo";


function App() {
  return (
  <BrowserRouter>
    <Sidebar >
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/manufacturer" element={<Manufacturer/>}/>
        <Route path="/manufacturer/:manufacturerId" element={<ManufacturerInfo/>}/>
        <Route path="/manufacturer/add" element={<AddManufacturer/>}/>
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<ProductInfo />} />
      </Routes>
    </Sidebar >
  </BrowserRouter>
    
  );
}

export default App;
