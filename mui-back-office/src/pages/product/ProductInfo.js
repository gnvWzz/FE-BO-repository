import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { HttpStatusCode } from 'axios';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import '../../components/ProductInfo.css'
import { NOTFOUND_URL } from '../../components/URLS/url';

function ProductInfo() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {accountUsername} = useParams();
  const {serialNumber} = useParams();
  const navigate = useNavigate();
  const [isComputer, setIsComputer] = useState(false);
  const [sciq, setSciq] = useState({
    size: "",
    color: "",
    img: [],
    quantity: ""
  })
  const [priceList, setPriceList] = useState([]);
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    manufacturer: "",
    serialNumber: "",
    priceListDtos: [],
    briefDescription: "",
    fullDescription: "",
    weight: "",
    material: "",
    size_color_img_quantity: "",
    cpu: "",
    ram: "",
    gpu: "",
    storageDrive: "",
    display: "",
  });

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    try {
      const res = await axios({
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
          "Content-Type": "application/json",
        },
        url: `http://localhost:8080/api/productdetail/${serialNumber}`,
        method: "GET",
      });
      if (res.status === HttpStatusCode.Ok) {
        // console.log("res.data: ", res.data);
        setProduct(res.data);
        const { size, color, img, quantity } = JSON.parse(res.data.size_color_img_quantity)
        setSciq((prevSciq) => ({
            ...prevSciq,
            size,
            color,
            img,
            quantity
        }))
        // sử dụng prevState truyền vào hàm setter để tránh việc state bị ghi đè bởi giá trị cũ khi update state
        setPriceList(res.data.priceListDtos)
        console.log(priceList)
        // xu ly hien thi giao dien theo category
        if(res.data.category === "Computer"){
          setIsComputer(true);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const showImage = () => {
    if (sciq.img !== undefined) {
      if (sciq.img[0] !== undefined) {
        return (
          <img alt="Product Pic" src={sciq.img[0].url} style={{ maxWidth: "100%", height: "auto", padding: "3em" }} />
        )
      } else {
        return (
          <img alt="Product Pic" src={NOTFOUND_URL} style={{ maxWidth: "100%", height: "auto", padding: "3em" }} />
        )
      }
    }
  }

  // function showPrice(){
  //   let firstPrice = priceList[0]?.price
  //   // Toán tử ?. là Optional Chaining, cho phép truy cập vào các thuộc tính lồng nhau mà không nhận được 
  //   // lỗi TypeError nếu bất kỳ thuộc tính lồng nhau nào {priceList[0]} bị undifined hoặc là null
  //   return (
  //     <>{firstPrice}</>
  //   )
  // }

  return (
    <Box m="20px 30px 0 30px">
      <Header
        title="PRODUCT INFO"
        subtitle="Product Info for Future Reference"
      />
      
      <Box
        display="grid"
        gap="30px" marginLeft={"20px"} marginRight={"20px"}
        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 5" },
        }}
      >

        <Grid sx={{ gridColumn: "span 2" }} >
          <Paper style={{maxWidth: "100%", height: "auto", padding: "1em", backgroundColor: "orange"}}>
            <Button onClick={() => navigate(`/store/${accountUsername}`)} variant="contained" color="primary">
              Return store
            </Button>
            <Box>
              {showImage()}
            </Box>
          </Paper>
        </Grid>

        <Grid sx={{ gridColumn: "span 3" }}>
          <Paper style={{maxWidth: "100%", height: "auto", padding: "1em",color: "primary", backgroundColor: "skyblue"}}>
            <Typography variant="h3" align="center" paddingBottom={"1em"} color="primary">
              {product.productName}
            </Typography>
            <table className='product-information'>
              <tbody>
                <tr>
                  <td width={"150px"}>Product Name</td>
                  <td>{product.productName}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <td>Manufacturer</td>
                  <td>{product.manufacturer}</td>
                </tr>
                <Button onClick={() => navigate(`/product/edit/general/${accountUsername}/${serialNumber}`)} 
                  variant="contained" color="primary" sx={{ width: "135px", height: "32px", mt:"5px"}}>
                  Edit general info
                </Button>
                <tr>
                  <td colSpan="2">
                    <hr/>
                  </td>
                </tr>
                <tr>
                  <td>Serial Number</td>
                  <td>{product.serialNumber}</td>
                </tr>
                {/* <tr>
                  <td>Price</td>
                  <td>{showPrice()}</td>
                </tr> */}
                <tr>
                  <td>Stock</td>
                  <td>{sciq.quantity}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{sciq.size}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{sciq.color}</td>
                </tr>
                <tr>
                  <td>Material</td>
                  <td>{product.material}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{product.weight}</td>
                </tr>
              <>{isComputer ? 
                <> 
                  <tr>
                    <td>CPU</td>
                    <td>{product.cpu}</td>
                  </tr>
                  <tr>
                    <td>RAM</td>
                    <td>{product.ram}</td>
                  </tr>
                  <tr>
                    <td>GPU</td>
                    <td>{product.gpu}</td>
                  </tr>
                  <tr>
                    <td>Storage Drive</td>
                    <td>{product.storageDrive}</td>
                  </tr>
                  <tr>
                    <td>Display</td>
                    <td>{product.display}</td>
                  </tr>
                  <tr>
                    <td>Brief Description</td>
                    <td>{product.briefDescription}</td>
                  </tr>
                  <tr>
                    <td>Full Description</td>
                    <td>{product.fullDescription}</td>
                  </tr>
                  </> : ""}
                </>
                <Button onClick={() => navigate(`/product/edit/detail/${accountUsername}/${serialNumber}`)} 
                  variant="contained" color="primary" sx={{ width: "135px", height: "32px", mt:"5px"}}>
                  Edit detail info
                </Button>  
              </tbody>
            </table>
            <table className='product-information'>
              <tbody>
                <tr>
                  <td colSpan="2">
                    <hr/>
                  </td>
                </tr>
                <tr>
                    <th>From Quantity</th>
                    <th>To Quantity</th>
                    <th>Price</th>
                </tr>
              {priceList.map((priceObj, index) => {
                    return(
                        <tr key={index}>
                            <td>{priceObj?.fromQuantity}</td>
                            <td>{priceObj?.toQuantity}</td>
                            <td>{priceObj?.price}</td>
                        </tr>
                      )
                    })
              }
              <Button onClick={() => navigate(`/product/edit/price/${accountUsername}/${serialNumber}`)} 
                variant="contained" color="primary" sx={{ width: "135px", height: "32px", mt:"5px"}}>
                Edit price
              </Button>
              </tbody>
            </table>
          </Paper>
        </Grid>
      </Box>
    </Box>
  )
}

export default ProductInfo
