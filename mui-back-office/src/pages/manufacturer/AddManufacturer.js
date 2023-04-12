import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios,{HttpStatusCode} from 'axios';
import { Box, Button, TextField, Snackbar} from "@mui/material";
import { Formik, Form , Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header';

export default function AddManufacturer() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleSubmit = (values) => {
    axios
      .post("http://localhost:8080/manufacturer/save", values)
      .then(res => {
        if (res.status === HttpStatusCode.Ok) {
          console.log("response data ", res.data);
          navigate(`/manufacturer/add-image/${res.data.id}`)
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("An error occurred while creating the manufacturer");
      });
  }

    return (
        <Box m="20px">
      <Header title="CREATE NEW MANUFACTURER" subtitle="Create a New Manufacturer" />

      <Formik
        initialValues={
          initialValues
        }
        validationSchema={addManufacturerSchema}
        onSubmit={values => {
        //   console.log(values);
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
                label="Business Code"
                onBlur={handleBlur}
                name="businessCode"
                error={!!touched.businessCode && !!errors.businessCode}
                helperText={touched.businessCode && errors.businessCode}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                required
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
                label="Field"
                onBlur={handleBlur}
                name="field"
                error={!!touched.field && !!errors.field}
                helperText={touched.field && errors.field}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                required
                type="text"
                label="Email"
                onBlur={handleBlur}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Mobile"
                onBlur={handleBlur}
                name="mobile"
                error={!!touched.mobile && !!errors.mobile}
                helperText={touched.mobile && errors.mobile}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Landline"
                onBlur={handleBlur}
                name="landline"
                error={!!touched.landline && !!errors.landline}
                helperText={touched.landline && errors.landline}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Signup Date"
                onBlur={handleBlur}
                name="signup"
                error={!!touched.signup && !!errors.signup}
                helperText={touched.signup && errors.signup}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
              <Field
                fullWidth
                variant="filled"
                type="text"
                label="Website"
                onBlur={handleBlur}
                name="website"
                error={!!touched.website && !!errors.website}
                helperText={touched.website && errors.website}
                sx={{ gridColumn: "span 2" }}
                as= {TextField}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" >
                Create New Manufacturer
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

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const addManufacturerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),

});
const initialValues = {
  businessCode: "",
  name: "",
  field: "",
  email: "",
  mobile: "",
  landline: "",
  address: "",
  signup: "",
  website: "",
};

