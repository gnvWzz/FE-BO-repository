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
  const [sciq, setSciq] = useState({
    size: "",
    color: "",
    img: [],
    quantity: ""
  })
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    manufacturer: "",
    serialNumber: "",
    standardPrice: "",
    briefDescription: "",
    fullDescription: "",
    weight: "",
    material: "",
    size_color_img_quantity: "",
    cpu: "",
    gpu: "",
    ram: "",
    storageDrive: "",
    display: "",
  });

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/productdetail/${serialNumber}`);
      if (res.status === HttpStatusCode.Ok) {
        console.log("res.data", res.data);
        setProduct(res.data);
        const { size, color, img, quantity } = JSON.parse(res.data.size_color_img_quantity)
        setSciq((prevSciq) => {
          return {
            ...prevSciq,
            size,
            color,
            img,
            quantity
          }
        })
        // sử dụng functional update để tránh việc state bị ghi đè bởi giá trị cũ khi update state
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
  return (
    <Box m="20px">
      <Header
        title="PRODUCT INFO"
        subtitle="Product Info for Future Reference"
      />
      
      <Box
        display="grid"
        gap="20px" marginLeft={"20px"} marginRight={"20px"}
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
                <Button onClick={() => navigate(`/product/edit/general/${accountUsername}/${serialNumber}`)} variant="contained" color="primary">
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
                <tr>
                  <td>Standard Price</td>
                  <td>{product.standardPrice}</td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>{sciq.quantity}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{sciq.color}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{sciq.size}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{product.weight}</td>
                </tr>
                <tr>
                  <td>Material</td>
                  <td>{product.material}</td>
                </tr>
                <tr>
                  <td>Brief Description</td>
                  <td>{product.briefDescription}</td>
                </tr>
                <tr>
                  <td>Full Description</td>
                  <td>{product.fullDescription}</td>
                </tr>
              </tbody>
            </table>

            {/* <a href="#" className="btn btn-primary">My Sales Performance</a>
                <a href="#" className="btn btn-primary">Team Sales Performance</a> */}
            
            <Button onClick={() => navigate(`/product/edit/detail/${accountUsername}/${serialNumber}`)} variant="contained" color="primary">
              Edit detail info
            </Button>
          </Paper>
        </Grid>
      </Box>
    </Box>
  )
}

export default ProductInfo
