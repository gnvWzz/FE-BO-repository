import React, { useState, useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, InputLabel, MenuItem, FormControl, Select,Snackbar} from "@mui/material";
import { Formik, Form , Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import axios, { HttpStatusCode } from 'axios';

const firstFormSchema = yup.object().shape({
    name: yup.string().required("Product Name is required"),
    category: yup.string().required('Category is required'),
  })
  const initialValues = {
    name: "",
    category: "",
    manufacturer: "",
    sizes: "",
    colors: "",
};

export default function FirstForm() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {accountUsername} = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [passProduct, setPassProduct] = useState({
        name: "",
        category: "",
        manufacturer: "",
        status: "",
        accountUsername: accountUsername,
        productSFDetailDtos: [

        ],
        priceListDtos: [

        ]
    })
    console.log(passProduct)
    const [colors, setColors] = useState([])

    const [sizes, setSizes] = useState([])
    useEffect(() => {
      }, [message]);

    const generateProduct = () => {
        console.log(passProduct.name)
        try {
          axios({
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
              "Content-Type": "application/json",
            },
            url: "http://localhost:8080/api/product/validation/first-form?name="+ passProduct.name,
            method: "GET",
            // su dung @RequestParam
          }).then((response) => {
            if (response.data === "NAME WAS EXISTED") {
                setMessage("This name was existed");
            }
            else {
                navigate(`/store/secondForm/${accountUsername}`, { state: { passProduct, sizes, colors} });
            }
          });
        } catch (err) {
          throw err;
        }
      }

    function handleInput(e) {
        const { name, value } = e.target;
        setPassProduct((prevProduct) => ({ ...prevProduct, [name]: value}));
    }

    function handleSizes(e) {
        setSizes(e.target.value.split(","))
    }

    function handleColors(e) {
        setColors(e.target.value.split(","))
    }

    function clearAllData() {
        setPassProduct({
            ...passProduct,
            name: "",
            packageId: "",
            category: "",
            manufacturer: "",
            status: "",
            productSFDetail: [
            ],
            prices: [

            ]
        })
        setColors([]);
        setSizes([]);
    }
    return (
    <Box m="20px 30px 0 30px">
        <Header
            title="CREATE PRODUCT FORM"
            subtitle="First Form to create a new product"
            />
            <Formik
                initialValues={initialValues}
                validationSchema={firstFormSchema}
                onSubmit={generateProduct}
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
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 2" }}
                    onBlur={handleBlur}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    label="Product Name"
                    name="name"
                    value={passProduct.name}
                    onChange={(e) => {
                        setFieldValue("name", e.target.value);
                        handleInput(e);
                    }}
                    as={TextField}
                />
                <Field
                    fullWidth
                    sx={{ gridColumn: 'span 2' }}
                    variant="filled"
                    name="category"
                    label="Category"
                    value={passProduct.category}
                    onChange={(e) => {
                        setFieldValue('category', e.target.value);
                        handleInput(e);
                    }}
                    onBlur={handleBlur}
                    as={Select}
                    error={touched.category && !!errors.category}
                    helperText={touched.category ? errors.category : ''}
                    displayEmpty={true}
                    >
                    <MenuItem value="" disabled>
                        Select a category
                    </MenuItem>
                    {['Computer', 'Toy', 'Watch', 'Cloth', 'Shoes', 'Accessory', 'Electronics', 'Jewelry', 'Phone', 'Cosmetics'].map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                    </Field>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 2" }}
                    onBlur={handleBlur}
                    error={touched.manufacturer && !!errors.manufacturer}
                    helperText={touched.manufacturer && errors.manufacturer}
                    label="Manufacturer"
                    name="manufacturer"
                    value={passProduct.manufacturer}
                    onChange={(e) => {
                        setFieldValue("manufacturer", e.target.value);
                        handleInput(e);
                    }}
                    as={TextField}
                />
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 2" }}
                    onBlur={handleBlur}
                    error={touched.sizes && !!errors.sizes}
                    helperText={touched.sizes && errors.sizes}
                    label="Sizes"
                    name="sizes"
                    value={passProduct.sizes}
                    onChange={(e) => {
                        setFieldValue("sizes", e.target.value);
                        handleSizes(e);
                    }}
                    as={TextField}
                />
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 2" }}
                    onBlur={handleBlur}
                    error={touched.colors && !!errors.colors}
                    helperText={touched.colors && errors.colors}
                    label="Colors"
                    name="colors"
                    value={passProduct.colors}
                    onChange={(e) => {
                        setFieldValue("colors", e.target.value);
                        handleColors(e);
                    }}
                    as={TextField}
                />
                {/* <button type="submit">Generate</button><br/> */}
                <Box 
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                    sx={{gridColumn: "span 2",
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                        "& .Mui-error": {
                            color: "red"
                          }
                    }}
                >
                    <Box
                        sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "flex-end",
                            gridRow: "1/1"
                        }}
                    >
                        <Button 
                            startIcon={<LabelImportantIcon />}
                            type="submit"
                            variant="contained" color="info" sx={{ width: '100px', height: '40px'}}>
                            Generate
                        </Button>
                        <Button 
                            startIcon={<ClearAllIcon />}
                            type='button'
                            onClick={clearAllData}
                            variant="contained" color="warning" sx={{ width: '100px', height: '40px', ml: '20px'}}>
                            Clear
                        </Button>
                    </Box>
                </Box>
                
                    <Button 
                        startIcon={<KeyboardReturnIcon />}
                        onClick={() => navigate(`/store/${accountUsername}`)} variant="contained" color="error" sx={{ width: '100px', height: '40px'}}>
                        Return
                    </Button>
                </Box>
            </Form>)}
        </Formik>

        <Snackbar
          open={!!message}
          autoHideDuration={5000}
          onClose={() => setMessage("")}
          message={message}
        />
    </Box>
    )
}