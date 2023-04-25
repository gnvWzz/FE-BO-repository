import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes,Route, BrowserRouter } from "react-router-dom";
import ProductInfo from "./pages/product/ProductInfo";
import Layout from "./components/Layout";
import Store from "./pages/store/Store";
import UpdateStoreImage from "./pages/store/UpdateStoreImage";
import UpdateStoreName from "./pages/store/UpdateStoreName";
import FirstForm from "./pages/product/FirstForm";
import SecondForm from "./pages/product/SecondForm";
import ThirdForm from "./pages/product/ThirdForm";
import UpdateProductGeneralInfo from "./pages/product/UpdateProductGeneralInfo";
import UpdateProductDetailInfo from "./pages/product/UpdateProductDetailInfo";
import UpdateProductPrice from "./pages/product/UpdateProductPrice";
import Login from "./pages/common/Login";
import SignUp from "./pages/common/SignUp"
import NotFoundPage from "./pages/common/NotFoundPage";

function App() {
  const [theme, colorMode] = useMode();
  // const isLoggedIn = false; // đổi thành true nếu người dùng đã đăng nhập

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
                    <Route path="*" element={<NotFoundPage/>}/>
                        <Route element={<Layout />}>
                            <Route exact path="/store/:accountUsername" element={<Store />} />
                            <Route exact path="/store/image/:accountUsername" element={<UpdateStoreImage />} />
                            <Route exact path="/store/name/:accountUsername" element={<UpdateStoreName />} />
                            <Route exact path="/store/product/:accountUsername" element={<FirstForm/>} />
                            <Route exact path="/store/secondForm/:accountUsername" element={<SecondForm />} />
                            <Route exact path="/store/thirdForm/:accountUsername" element={<ThirdForm />} />
                            <Route exact path="/product/:accountUsername/:serialNumber" element={<ProductInfo/>}/>
                            <Route exact path="/product/edit/general/:accountUsername/:serialNumber" element={<UpdateProductGeneralInfo/>}/>
                            <Route exact path="/product/edit/detail/:accountUsername/:serialNumber" element={<UpdateProductDetailInfo/>}/>
                            <Route exact path="/product/edit/price/:accountUsername/:serialNumber" element={<UpdateProductPrice/>}/>
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
