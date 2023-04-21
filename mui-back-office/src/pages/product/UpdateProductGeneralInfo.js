import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { HttpStatusCode } from 'axios';
import { Box, Button, TextField, InputLabel, MenuItem, FormControl, Select, Typography} from "@mui/material";
import '../../components/ProductInfo.css'
import { Formik, Form , Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const updateGeneralSchema = yup.object().shape({
    newName: yup.string().required("Product's Name is required"),
    // category: yup.string().required('Category is required'),
  })
  const initialValues = {
    newName: "",
    category: "",
    manufacturer: "",
};

export default function UpdateProduct() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {accountUsername} = useParams();
  const {serialNumber} = useParams();
  const navigate = useNavigate();
  const [requestProductGeneralInfoDto, setRequestProductGeneralInfoDto] = useState({
    curName: "",
    newName: "",
    category: "",
    manufacturer: "",
  });
  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    try {
      const res = await axios ({
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
          "Content-Type": "application/json",
        },
        url: `http://localhost:8080/api/productdetail/general/${serialNumber}`,
        method: "GET",
      })
      if (res.status === HttpStatusCode.Ok) {
        console.log("res.data", res.data);
        setRequestProductGeneralInfoDto({...requestProductGeneralInfoDto, curName: res.data.name, category: res.data.category, manufacturer: res.data.manufacturer})
      }
    } catch (err) {
      throw err;
    }
  };

    const saveGeneralInfo = () => {
      console.log("requestProductGeneralInfoDto: ", requestProductGeneralInfoDto)
      axios ({
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
          "Content-Type": "application/json",
        },
        url: `http://localhost:8080/api/product/update/general`,
        method: "PUT",
        data: requestProductGeneralInfoDto,
      })
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            // console.log(res.status);
            navigate(`/product/${accountUsername}/${serialNumber}`)
          }
        })
        .catch(err => {
          console.error(err);
        });
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setRequestProductGeneralInfoDto((prevState) => ({ ...prevState, [name]: value}));
    }

  return (
    <Box m="20px">
      <Header
        title="PRODUCT INFO"
        subtitle="Product Info for Future Reference"
      />
      <Formik
                    initialValues={initialValues}
                    validationSchema={updateGeneralSchema}
                    onSubmit={saveGeneralInfo}
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
                    ml="20px" mr="20px"
                    >
                <Box sx={{ gridColumn: "span 2" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  Product's Name
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    
                    onBlur={handleBlur}
                    error={touched.newName && !!errors.newName}
                    helperText={touched.newName && errors.newName}
                    // label="Product's Name"
                    name="newName"
                    placeholder={requestProductGeneralInfoDto.curName}
                    // value={product.name}
                    onChange={(e) => {
                        setFieldValue("newName", e.target.value);
                        handleInput(e);
                    }}
                    as={TextField}
                />
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  Category
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    name="category"
                    // label="Category"
                    value={requestProductGeneralInfoDto.category}
                    onChange={(e) => {
                        setFieldValue('category', e.target.value);
                        handleInput(e);
                    }}
                    onBlur={handleBlur}
                    as={Select}
                    error={touched.category && !!errors.category}
                    helperText={touched.category ? errors.category : ''}
                    >
                    <MenuItem value="" disabled>
                        Select a category
                    </MenuItem>
                    {['Computer', 'Toy', 'Watch', 'Cloth', 'Shoes', 'HandBag', 'Accessory', 'Electronics'].map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                    </Field>
                    </Box>
                    <Box sx={{ gridColumn: "span 2" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  Manufacturer
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}               
                    error={touched.manufacturer && !!errors.manufacturer}
                    helperText={touched.manufacturer && errors.manufacturer}
                    // label="Manufacturer"
                    name="manufacturer"
                    placeholder={requestProductGeneralInfoDto.manufacturer}
                    // value={product.manufacturer}
                    onChange={(e) => {
                        setFieldValue("manufacturer", e.target.value);
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
                    gridRow: "3 / 4"
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ width: "100px", height: "40px", mr: "20px"}}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                  <Button 
                    startIcon={<KeyboardReturnIcon />}
                    onClick={() => navigate(`/product/${accountUsername}/${serialNumber}`)} variant="contained" color="secondary" sx={{ width: '100px', height: '40px'}}>
                    Return
                  </Button>
                </Box>
              </Box>
            </Form>)}
            </Formik>
      </Box>
  )
}
