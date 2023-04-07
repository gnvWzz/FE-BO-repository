// import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />
import SideBar from "./components/SideBar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes,Route, BrowserRouter } from "react-router-dom";
import Manufacturer from "./pages/manufacturer/Manufacturer";
import Topbar from "./components/Topbar";
import Product from "./pages/product/Product";
import ManufacturerInfo from "./pages/manufacturer/ManufacturerInfo";
import ProductInfo from "./pages/product/ProductInfo";
import AddProduct from "./pages/product/AddProduct";
import Account from "./pages/account/account";
import AddManufacturer from "./pages/manufacturer/AddManufacturer";
import Calendar from "./components/Calendar";
function App() {
  const [theme, colorMode] = useMode();

  return (
  <BrowserRouter>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <div className="app">
            <SideBar/>
            <main className="content">
              <Topbar/>
                <Routes>
                  <Route exact path="/manufacturer/list" element={<Manufacturer />} />
                  <Route exact path="/manufacturer/:manufacturerId" element={<ManufacturerInfo/>}/>
                  <Route exact path="/manufacturer/add" element={<AddManufacturer/>}/>
                  <Route exact path="/bo/product/list" element={<Product />} />
                  <Route exact path="/bo/product/:productId" element={<ProductInfo/>}/>
                  <Route exact path="/bo/product/add" element={<AddProduct/>}/>
                  <Route exact path="/account" element={<Account/>}/>
                  <Route exact path="/calendar" element={<Calendar/>}/>
                </Routes>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  </BrowserRouter>
  );
}

export default App;
