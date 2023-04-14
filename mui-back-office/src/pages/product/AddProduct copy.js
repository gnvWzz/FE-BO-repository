import React, {useState, useEffect} from 'react'
import axios,{HttpStatusCode} from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Snackbar} from "@mui/material";
import { Formik, Form , Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header';

export default function AddProduct() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // const [product, setProduct] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleSubmit = (values) => {
    const { size, color, ...data } = values;
  const sizeColor = { size, color };
  if (size && color) {
    data.sizeColor = JSON.stringify(sizeColor);
  }
    axios
      .post("http://localhost:8080/bo/product/save", data)
      .then(res => {
        if (res.status === HttpStatusCode.Ok) {
          // setMessage("successfully created");
          console.log("response data ", res.data);
          navigate(`/bo/product/add-image/${res.data.id}`)
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("An error occurred while creating the product");
      });
  }

    return (
        <Box m="20px">
      <Header title="CREATE NEW PRODUCT" subtitle="Create a New Product" />

      <Formik
        initialValues={initialValues}
        validationSchema={addProductSchema}
        onSubmit={values => {
          console.log(values);
          // setProduct({
          //   ...product,
          //   serialNumber: values.serialNumber,
          //   name: values.name,
          //   category: values.category,
          //   price: values.price,
          //   size: values.size,
          //   color: values.color,
          //   weight: values.weight,
          //   material: values.material,
          //   quantity: values.quantity,
          //   icon: values.icon,
          //   briefDescription: values.briefDescription,
          //   fullDescription: values.fullDescription,
          //   manufacturerId: values.manufacturerId,
          // });
          handleSubmit(values);
        }}
      >
        {({
          errors,
          touched,
          handleBlur
        }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Serial Number"
                onBlur={handleBlur}
                name="serialNumber"
                error={!!touched.serialNumber && !!errors.serialNumber}
                helperText={touched.serialNumber && errors.serialNumber}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                onBlur={handleBlur}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              {/* <Field
                fullWidth
                variant="filled"
                type="text"
                label="Size"
                onBlur={handleBlur}
                name="size"
                error={!!touched.size && !!errors.size}
                helperText={touched.size && errors.size}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Color"
                onBlur={handleBlur}
                name="color"
                error={!!touched.color && !!errors.color}
                helperText={touched.color && errors.color}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              /> */}
              <Field
                fullWidth
                variant="filled"
                type="number"
                label="Weight"
                onBlur={handleBlur}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Material"
                onBlur={handleBlur}
                name="material"
                error={!!touched.material && !!errors.material}
                helperText={touched.material && errors.material}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              {/* <Field
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              /> */}
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Brief Description"
                onBlur={handleBlur}
                name="briefDescription"
                error={!!touched.briefDescription && !!errors.briefDescription}
                helperText={touched.briefDescription && errors.briefDescription}
                sx={{ gridColumn: "span 4" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Full Description"
                onBlur={handleBlur}
                name="fullDescription"
                error={!!touched.fullDescription && !!errors.fullDescription}
                helperText={touched.fullDescription && errors.fullDescription}
                sx={{ gridColumn: "span 4" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="number"
                label="Manufacturer Id"
                onBlur={handleBlur}
                name="manufacturerId"
                error={!!touched.manufacturerId && !!errors.manufacturerId}
                helperText={touched.manufacturerId && errors.manufacturerId}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" >
                Create New Product
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={!!message}
        autoHideDuration={5000}
        onClose={() => setMessage("")}
        message={message}
      />
    </Box>
  );
};

const addProductSchema = yup.object().shape({
  serialNumber: yup.string().required("required"),
  name: yup.string().required("required"),
  category: yup.string().required("required"),
  price: yup.string().required("required"),
  quantity: yup.string().required("required"),
  manufacturerId: yup.string().required("required"),
});

const initialValues = {
    serialNumber: "",
    name: "",
    category: "",
    price: "",
    size: "",
    color: "",
    sizeColor: "",
    weight: "",
    material: "",
    quantity: "",
    briefDescription: "",
    fullDescription: "",
    manufacturerId: "",
};

