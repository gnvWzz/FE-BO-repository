
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes,Route, BrowserRouter } from "react-router-dom";
import ManufacturerList from "./pages/manufacturer/ManufacturerList";
import ProductList from "./pages/product/ProductList";
import ManufacturerInfo from "./pages/manufacturer/ManufacturerInfo";
import ProductInfo from "./pages/product/ProductInfo";
import AddProduct from "./pages/product/AddProduct";
import AddManufacturer from "./pages/manufacturer/AddManufacturer";
import Calendar from "./components/Calendar";
import MemberList from "./pages/member/MemberList";
import AddMember from "./pages/member/AddMember";
import AddMemberImage from "./pages/member/AddMemberImage";
import AddManufacturerImage from "./pages/manufacturer/AddManufacturerImage";
import AddProductImages from "./pages/product/AddProductImages";
import Login from "./components/Login";
import Layout from "./components/Layout";
import SignUp from "./components/SignUp";
import Store from "./pages/manufacturer/Store";
import UpdateStoreImage from "./pages/manufacturer/UpdateStoreImage";
import UpdateStoreName from "./pages/manufacturer/UpdateStoreName";


function App() {
  const [theme, colorMode] = useMode();
  const isLoggedIn = false; // đổi thành true nếu người dùng đã đăng nhập

  return (

    <div className="app">
      <main className="content">
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}> 
          <CssBaseline/>
          
                  <Routes>
                    <Route exact path="/" element={<Login />}/>
                    <Route exact path="/signup" element={<SignUp />}/>
                          <Route element={<Layout />}>
                            <Route exact path="/store/:storeId" element={<Store />} />
                            <Route exact path="/store/image/:storeId" element={<UpdateStoreImage />} />
                            <Route exact path="/store/name/:storeId" element={<UpdateStoreName />} />

                            <Route exact path="/member/list" element={<MemberList />} />
                            <Route exact path="/member/add" element={<AddMember />} />
                            {/* <Route exact path="/member/:memberId" element={<Account />} /> */}
                            <Route exact path="/member/add-image/:memberId" element={<AddMemberImage />} />
                            <Route exact path="/manufacturer/add-image/:manufacturerId" element={<AddManufacturerImage />} />
                            <Route exact path="/bo/product/add-image/:productId" element={<AddProductImages />} />
                            <Route exact path="/manufacturer/list" element={<ManufacturerList />} />
                            <Route exact path="/manufacturer/:manufacturerId" element={<ManufacturerInfo/>}/>
                            <Route exact path="/manufacturer/add" element={<AddManufacturer/>}/>
                            <Route exact path="/bo/product/list" element={<ProductList />} />
                            <Route exact path="/bo/product/:productId" element={<ProductInfo/>}/>
                            <Route exact path="/bo/product/add" element={<AddProduct/>}/>
                            {/* <Route exact path="/account" element={<Account/>}/> */}
                            <Route exact path="/calendar" element={<Calendar/>}/>
                            </Route>               
                  </Routes>
        
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
    </main>
    </div>

  );
}

export default App;
