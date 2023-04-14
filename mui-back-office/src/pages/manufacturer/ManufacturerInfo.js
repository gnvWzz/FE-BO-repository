import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios,{HttpStatusCode} from 'axios';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';

export default function ManufacturerInfo() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [manufacturer, setManufacturer] = useState({})
    const {manufacturerId} = useParams();
    const [manufacturerProductBODtos, setManufacturerProductBODtos] = useState([]);
    const [decodedString, setDecodedString ] = useState("");

    useEffect(() => {
        loadManufacturer()
    },[])

    const loadManufacturer = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/manufacturer/${manufacturerId}`);
          if (res.status === HttpStatusCode.Ok) {
            console.log(res.data);
            setManufacturer(res.data);
            setManufacturerProductBODtos(res.data.responseManufacturerProductBODtos)
            const encodedString = res.data.image; // chuỗi mã hóa
            const lastChar = encodedString.charAt(encodedString.length - 1); // lấy ký tự cuối cùng
            const numPadChars = (lastChar === "=" ? 1 : 0) + (lastChar === "==" ? 1 : 0); // tính số ký tự đệm bị bỏ qua
            const encodedWithoutPadding = encodedString.slice(0, -numPadChars); // xóa các ký tự đệm
            setDecodedString( decodeURIComponent(encodedWithoutPadding));
          }
        } catch (err) {
          throw err;
        }
      };

    return (
  <Box m="20px">
      <Header
          title="MANUFACTURER INFO"
          subtitle="Manufacturer Info for Future Reference"
        />    
    <Box
      display="grid"
      gap="20px" marginLeft={"20px"} marginRight={"20px"}
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <a href={`/manufacturer/store/${manufacturerId}`}>Update Your store</a>
      <Grid sx={{ gridColumn: "span 2" }}>
          
          <Paper>
            <img alt="Manufacturer Pic" src={decodedString} className="img-circle img-responsive" style={{maxWidth: "100%", height: "auto", padding: "3em"}}/>
          </Paper>
      </Grid>      

      <Grid sx={{ gridColumn: "span 2" }}>
          <Paper>          
                  <table className="table table-user-information">
                    <tbody>
                      <tr style={{backgroundColor: "rgb(166, 239, 248)"}}>
                        <td>
                          <h4 className="panel-title">{manufacturer.name}</h4>
                        </td>
                        <td></td>                        
                      </tr>

                      <tr>
                        <td>Id:</td>
                        <td>{manufacturer.id}</td>
                      </tr>
                      <tr>
                        <td>Field</td>
                        <td>{manufacturer.field}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{manufacturer.email}</td>
                      </tr>
                   
                         <tr>
                        <td>Address</td>
                        <td>{manufacturer.address}</td>
                      </tr>
                        
                      <tr>
                        <td>SignUp Date</td>
                        <td>{manufacturer.signup}</td>
                      </tr>
                      <tr>
                        <td>Phone Number</td>
                        <td>{manufacturer.mobile}(Mobile) <br></br> {manufacturer.landline}(Landline)</td>
                      </tr>
                      <tr>
                        <td>Website</td>
                        <td><a href={manufacturer.website}>{manufacturer.website}</a></td>
                      </tr>
                      <tr>
                        <td>Products</td>
                        <td><ol type='1'>
                          {manufacturerProductBODtos.map((ele) =>(
                              <li><a href={`/bo/product/${ele.productBOId}`}>{ele.productBOName}</a></li>
                            ))
                          }
                        </ol>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <a href="#" className="btn btn-primary">My Sales Performance</a>
                  <a href="#" className="btn btn-primary">Team Sales Performance</a>
        </Paper>
      </Grid>      
    </Box>
  </Box>
    )
}

