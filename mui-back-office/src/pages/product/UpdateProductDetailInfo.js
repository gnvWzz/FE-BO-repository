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

function UpdateProductDetailInfo() {
    return (
    <Box m="20px">
      <Header
        title="UPDATE DETAIL INFO"
        subtitle="Update product detail info"
      />

    </Box>
    )
}

export default UpdateProductDetailInfo
