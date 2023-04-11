import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios,{HttpStatusCode} from 'axios';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';

function ProductInfo() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [product, setProduct] = useState({});
    const {productId} = useParams();
    const [manufacturerProductBODtos, setManufacturerProductBODtos] = useState([]);
    const [decodedString, setDecodedString ] = useState("");

    useEffect(() => {
        loadProduct()
    },[])

    const loadProduct = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/bo/product/${productId}`);
          if (res.status === HttpStatusCode.Ok) {
            console.log(res.data);
            setProduct(res.data);
            setManufacturerProductBODtos(res.data.responseManufacturerProductBODtos);
            const encodedString = res.data.image; // chuỗi mã hóa
            const lastChar = encodedString.charAt(encodedString.length - 1); // lấy ký tự cuối cùng
            const numPadChars = (lastChar === "=" ? 1 : 0) + (lastChar === "==" ? 1 : 0); // tính số ký tự đệm bị bỏ qua
            const encodedWithoutPadding = encodedString.slice(0, -numPadChars); // xóa các ký tự đệm
            setDecodedString( encodedWithoutPadding ? JSON.parse(decodeURIComponent(encodedWithoutPadding)) : []);
          }
        } catch (err) {
          throw err;
        }
      };
      console.log(manufacturerProductBODtos)
    return (
    <Box m="20px">
      <Header
          title="PRODUCT INFO"
          subtitle="Product Info for Future Reference"
        />
      <Box
        display="grid"
        gap="20px" marginLeft={"20px"} marginRight={"20px"}
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        
        <Grid sx={{ gridColumn: "span 2" }}>
          <Paper>
            <div>
              <img alt="Product Pic" src={decodedString[0]} style={{maxWidth: "100%", height: "auto", padding: "3em"}}/>
            </div>
          </Paper>
        </Grid>

        <Grid sx={{ gridColumn: "span 2" }}>
          <Paper>
              <Typography variant="h4" align="center">
                {product.name}
              </Typography>
              <table>
                <tbody>
                  <tr style={{backgroundColor: "rgb(166, 239, 248)"}}>
                    <td>
                      <h4 className="panel-title">{product.name}</h4>
                    </td>
                    <td></td>                        
                  </tr>
                  <tr>
                    <td>Id</td>
                    <td>{product.id}</td>
                  </tr>
                  <tr>
                    <td>Serial Number</td>
                    <td>{product.serialNumber}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{product.price}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td>{product.quantity}</td>
                  </tr>
                  <tr>
                    <td>Size</td>
                    <td>{product.size}</td>
                  </tr>
                  <tr>
                    <td>Color</td>
                    <td>{product.color}</td>
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
                  <tr>
                    <td>Status</td>
                    <td>{product.status}</td>
                  </tr>
                  <tr>
                    <td>Manufacturers</td>
                    <td><ol type='1'>
                      {manufacturerProductBODtos.map((manufacturer) =>(
                          <li><a href={`/manufacturer/${manufacturer.manufacturerId}`}>{manufacturer.manufacturerName}</a></li>
                        ))
                      }
                    </ol>
                    </td>
                  </tr>
                </tbody>
              </table>
                    
                {/* <a href="#" className="btn btn-primary">My Sales Performance</a>
                <a href="#" className="btn btn-primary">Team Sales Performance</a> */}
            </Paper>
              
          {/* <div className="panel-footer">
                  <span className="pull-right">
                      <div classNameName='icon' style={{textAlign: "right"}}><FcEditImage/></div>
                  </span>
              </div> */}
      </Grid>
     </Box>
    </Box>
    )
}

export default ProductInfo
