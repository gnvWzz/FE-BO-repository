import React, { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import axios, { HttpStatusCode } from 'axios';
import {Grid, Box, Button, TextField, Typography} from "@mui/material";
import '../../components/ProductInfo.css'
import { Formik, Form , Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CheckIcon from '@mui/icons-material/Check';

const updatePriceSchema = yup.object().shape({
    price: yup.string().required("Price is required"),
    fromQuantity: yup.string().required('From Quantity is required'),
  })
  const initialValues = {
    priceId: "",
        fromQuantity: "",
        toQuantity: "",
        price: "",
};
export default function UpdateProductPrice() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {accountUsername} = useParams();
    const {serialNumber} = useParams();
    const navigate = useNavigate();
    const [requestPriceList, setRequestPriceList] = useState([]);
    const [priceObj, setPriceObj] = useState({
        priceId: 0,
        fromQuantity: 0,
        toQuantity: 0,
        price: 0,
    });
  
  useEffect(() => {
  }, [requestPriceList])

  const savePriceList = async () => {
    // console.log("requestPriceList: ",requestPriceList)
    try {
      const res = await axios ({
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
          "Content-Type": "application/json",
        },
        url: `http://localhost:8080/api/price/update/${serialNumber}`,
        method: "POST",
        data: requestPriceList,
      })
      if (res.status === HttpStatusCode.Ok) {
        // console.log("response: ", res.status);
        navigate(`/product/${accountUsername}/${serialNumber}`)
      }
    } catch (err) {
      throw err;
    }
  };

  function handleInput(e) {
        const { name, value } = e.target;
        setPriceObj((prevState) => ({ ...prevState, [name]: value}));
  }

  const savePriceObj = () => {
      if(priceObj.toQuantity === ""){
          setPriceObj((prevState) => ({...prevState, toQuantity: Number.MAX_SAFE_INTEGER}))
      }
      if (requestPriceList.length === 0) {
          setPriceObj((prevState) => ({...prevState, priceId: 0
      }))
          } else {
              setPriceObj((prevState) => ({...prevState, priceId: requestPriceList.length}))
          }
      console.log("requestPriceList: ", requestPriceList)
  }

  function addObjToList(){
      setRequestPriceList([...requestPriceList,priceObj])
      console.log("requestPriceList", requestPriceList)
  }

  function clearPriceList(){
    setRequestPriceList([]);
  }

    return (
  <Box m="20px 30px 0 30px">
    <Header
      title="UPDATE GENERAL INFO"
      subtitle="Update product general info"
    />
    
    <Box
      display="grid"
      gap="20px" marginLeft={"20px"} marginRight={"20px"}
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
      }}
    >
      <Grid sx={{ gridColumn: "span 1" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={updatePriceSchema}
          onSubmit={savePriceObj}
        >
            {({
                errors,
                touched,
                handleBlur, 
                setFieldValue,
                }) => (
            <Form>
            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    "& .Mui-error": {
                        color: "red"
                      }
                }}
                // ml="20px" mr="20px"
                >
                <Box sx={{ gridColumn: "span 3" }}>
                  <Typography style={{margin: "0 0 10px 10px"}}>
                    From Quantity
                  </Typography>
                  <Field
                      fullWidth
                      variant="filled"
                      type="number"
                      onBlur={handleBlur}               
                      error={touched.fromQuantity && !!errors.fromQuantity}
                      helperText={touched.fromQuantity && errors.fromQuantity}
                      name="fromQuantity"
                      onChange={(e) => {
                          setFieldValue("fromQuantity", e.target.value);
                          handleInput(e);
                      }}
                      as={TextField}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 3" }}>
                  <Typography style={{margin: "0 0 10px 10px"}}>
                    To Quantity
                  </Typography>
                  <Field
                    fullWidth
                    variant="filled"
                    type="number"
                    
                    onBlur={handleBlur}
                    error={touched.toQuantity && !!errors.toQuantity}
                    helperText={touched.toQuantity && errors.toQuantity}
                    name="toQuantity"
                    // label="toQuantity"
                    // placeholder={requestProductGeneralInfoDto.curName}
                    // value={product.name}
                    onChange={(e) => {
                        setFieldValue("toQuantity", e.target.value);
                        handleInput(e);
                    }}
                    as={TextField}
                  />
                </Box>
                
                <Box sx={{ gridColumn: "span 3" }}>
                  <Typography style={{margin: "0 0 10px 10px"}}>
                    Price
                  </Typography>
                  <Field
                      fullWidth
                      variant="filled"
                      type="number"
                      onBlur={handleBlur}               
                      error={touched.price && !!errors.price}
                      helperText={touched.price && errors.price}
                      name="price"
                      onChange={(e) => {
                          setFieldValue("price", e.target.value);
                          handleInput(e);
                      }}
                      as={TextField}
                  />
                </Box>
            <Box
              sx={{
                gridColumn: "span 4",
                display: "flex",
                justifyContent: "left",
                alignItems: "flex-end",
                gridRow: "4 / 5"
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ width: "140px", height: "40px", mr: "20px"}}
                startIcon={<CheckIcon />}
              >
                Confirm Price
              </Button>
              <Button
                type="button"
                variant="contained"
                color="success"
                onClick={addObjToList}
                sx={{ width: "140px", height: "40px", mr: "20px"}}
                startIcon={<BookmarkAddIcon />}
              >
                Set Price
              </Button>
              <Button
                type="button"
                variant="contained"
                color="warning"
                onClick={clearPriceList}
                sx={{ width: "140px", height: "40px", mr: "20px"}}
                startIcon={<ClearAllIcon />}
              >
                Clear All
              </Button>
            </Box>
            <Box
              sx={{
                gridColumn: "span 4",
                display: "flex",
                justifyContent: "left",
                alignItems: "flex-end",
                gridRow: "5 / 5"
              }}
            >
              <Button
                type="button"
                variant="contained"
                color="info"
                onClick={savePriceList}
                sx={{ width: "100px", height: "40px", mr: "20px"}}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button 
                startIcon={<KeyboardReturnIcon />}
                onClick={() => navigate(`/product/${accountUsername}/${serialNumber}`)} variant="contained" color="error" sx={{ width: '100px', height: '40px'}}>
                Return
              </Button>
            </Box>
          </Box>
        </Form>)}
      </Formik>
      </Grid>
      
      <Grid sx={{ gridColumn: "span 1" }}>
        <Box>
            <table>
              <thead>
                <tr>
                  <th>TEMPORARY PRICE LIST</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <th>From Quantity</th>
                    <th>To Quantity</th>
                    <th>Price</th>
                </tr>
              {requestPriceList.map((priceObj, index) => {
                    return(
                        <tr key={index}>
                            <td>{priceObj?.fromQuantity}</td>
                            <td>{priceObj?.toQuantity}</td>
                            <td>{priceObj?.price}</td>
                        </tr>
                      )
                    })
              }
              </tbody>
            </table>
        </Box>
      </Grid>    
    </Box>

  </Box>
    )
}

