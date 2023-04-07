import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios,{HttpStatusCode} from 'axios';
import { Grid, Paper, Typography, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ManufacturerInfo() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [manufacturer, setManufacturer] = useState({})
    const {manufacturerId} = useParams();

    useEffect(() => {
        loadManufacturer()
    },[])

    const loadManufacturer = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/manufacturer/${manufacturerId}`);
        //   console.log(res.data);
          if (res.status === HttpStatusCode.Ok) {
            setManufacturer(res.data);
          }
        } catch (err) {
          throw err;
        }
      };

    return (
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
            <img alt="Manufacturer Pic" src={manufacturer.icon} className="img-circle img-responsive" style={{maxWidth: "100%", height: "auto", padding: "3em"}}/>
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
                     
                    </tbody>
                  </table>
                  
                  <a href="#" className="btn btn-primary">My Sales Performance</a>
                  <a href="#" className="btn btn-primary">Team Sales Performance</a>
        </Paper>
      </Grid>      
    </Box>
    )
}

