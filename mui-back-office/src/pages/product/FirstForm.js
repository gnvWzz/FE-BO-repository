import React, { useState, useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, InputLabel, MenuItem, FormControl, Select} from "@mui/material";
import { Formik, Form , Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header';

const firstFormSchema = yup.object().shape({
    name: yup.string().required("Product's Name is required"),
    packageId: yup.string().required("Package ID is required"),
    category: yup.string().required('Category is required'),
    // sizes: yup.string().required("Sizes is required"),
    // colors: yup.string().required("Colors is required"),
  })
  const initialValues = {
    name: "",
    category: "",
    packageId: "",
    manufacturer: "",
    sizes: "",
    colors: "",
};

export default function FirstForm() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {accountUsername} = useParams();
    const [passProduct, setPassProduct] = useState({
        name: "",
        packageId: "",
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

    const navigate = useNavigate();

    const generateProduct = () => {
        // passProduct.accountUsername = accountUsername;
            navigate(`/store/secondForm/${accountUsername}`, { state: { passProduct, sizes, colors} });
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
        <Box m="20px">
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
                    >
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 2" }}
                    onBlur={handleBlur}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    label="Product's Name"
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
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 2" }}
                    onBlur={handleBlur}
                    error={touched.packageId && !!errors.packageId}
                    helperText={touched.packageId && errors.packageId}
                    label="Package ID"
                    name="packageId"
                    value={passProduct.packageId}
                    onChange={(e) => {
                        setFieldValue("packageId", e.target.value);
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
                    >
                    <MenuItem value="" disabled>
                        Select a category
                    </MenuItem>
                    {['Computer', 'Toy', 'Watch', 'Cloth', 'Shoes', 'HandBag', 'Accessory', 'Electronics'].map((category) => (
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
                <button type="submit">Generate</button><br/>
                {/* <Button style={{backgroundColor: "#007bff"}} type="submit">Generate</Button><br/> */}
                <button onClick={clearAllData} style={{backgroundColor: "orange"}}>Clear</button>
            </Box>
            </Form>)}
            </Formik>

        </Box>
    )
}