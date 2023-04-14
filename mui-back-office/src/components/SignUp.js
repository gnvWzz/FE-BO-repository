import React, { useEffect, useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import { Formik,Field } from "formik";
import axios from "axios";


export default function SignUp(){

  const REGEX = {
    //username có ít nhất 8 kí tự dài nhất 20 kí tự, không có các dấu chấm . _ ở đầu tên giữa và cuối tên
    usernameRegex: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //email tuân theo RFC 2822
    emailRegex:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    //password có ít nhất 8 kí tự, có chữ cái in hoa, chữ cái thường, kí tự đặt biệt
    passwordRegex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  };

  const [form, setForm] = useState({
    email:"",
    username:"",
    password:"",
    confirmPassword:""
  });
  const navigate = useNavigate();

  const [msgError, setmsgError] = useState({
    email:"",
    username:"",
    password:"",
    confirmPassword:""
  });

  const handleChange =(e)=> {
    setForm({
      ...form,
      [e.target.name]:e.target.value 
    });
  }

  const handleSubmit =  ()=> { 
   
    const isFilled =
    form.username &&
  
    form.email &&
    
    form.password &&
    
    form.confirmPassword;
  
  const isError =
    isFilled &&
    (msgError.email ||
      msgError.username ||
      msgError.password ||
      msgError.confirmPassword);

      if(isFilled && !isError){
        axios
        .post(`http://localhost:8080/api/account/signup-owner` ,form)
        .then((res) =>{

        })
        .catch((err)=>{
          throw err
        })
        alert("Đăng kí thành công! " )
          navigate(`/`);
        
      }else {
        alert("Vui lòng điền đầy đủ thông tin!")
      }     
}

const handleValidate = async() =>{
  const errors = {
      email:"",
      username:"",
      password:"",
      confirmPassword:""
  }; 
  const isValidEmail = REGEX.emailRegex.test(form.email);
  const isValidUsername = REGEX.usernameRegex.test(form.username);
  if (!form.email) {
      errors.email = "Bắt buộc";
  } else if (!isValidEmail) {
    errors.email = "Email không hợp lệ";
  }else if(isValidEmail){
    const data = form.email;
     await   axios
      .get(`http://localhost:8080/api/account/duplicate-email/${data}`)
      .then((res) => {
        if(res.data === "Exist"){
          errors.email = "Email đã tồn tại";  
        }else{
          errors.email = "";
        }
      })
      .catch((err) => {
        throw err;
      });
  }
  
  if (!form.username) {
      errors.username = "Bắt buộc";
  } else if (!isValidUsername) {
      errors.username = "Tài khoản chưa đúng,ít nhất 8 kí tự";
  }else if(isValidUsername){
    const data = form.username;
    await  axios
     .get(`http://localhost:8080/api/account/duplicate-username/${data}`)
     .then((res) => {
       if(res.data === "Exist"){
         errors.username = "Username đã tồn tại";  
       }else{
         errors.username = "";
       }
     })
     .catch((err) => {
       throw err;
     });
  }

  if (!form.password) {
      errors.password = "Bắt buộc";
    } else if (!REGEX.passwordRegex.test(form.password)) {  
      errors.password = "Mật khẩu có ít nhất 8 kí tự,1 chữ cái In hoa, số và kí tự đặt biệt ";
    }

  if (!form.confirmPassword) {
      errors.confirmPassword = "Bắt buộc";
    } else if (form.confirmPassword !== form.password){
      errors.confirmPassword = "Mật khẩu chưa trùng khớp";
    }
    setmsgError(errors);
    return errors;
}



    const theme = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                ...(ownerState.variant === 'contained' &&
                  ownerState.color === 'primary' && {
                    backgroundColor: '#202020',
                    color: '#fff',
                  }),
              }),
            },
          },
        },
      });
        
   
    return (
     
      <div className="signUp-container">
      <div class="account section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="login-form border p-5">
                <div class="text-center heading">
                  <h2 class="mb-2 color-text" >Sign Up</h2>
                  <p class="lead color-text" >
                    Already have an account? <a href="/"> Login now</a>
                  </p>
                </div>
                <Formik 
                initialValues={form}
                validate={handleValidate}
                onSubmit={
                  handleSubmit
                }
                >
                    {({errors, touched}) =>(
                         <form  onSubmit={handleSubmit}>
                         <div
                           class="form-group mb-4"
                           className={`custom-input ${
                             errors.email ? "form-group mb-4 custom-input-error"
                                          : "form-group mb-4"
                           }`}
                         >
                           <h6 for="#" className="color-text">Email Address</h6 >
                           <Field
                            
                             type="email"
                             className="form-control"
                             name="email"
                             value={form.email || ""}
                             placeholder="Enter Email Address"
                             onChange={handleChange}
                           />
                           {errors.email && touched.email
                           ?<p className="error">{errors.email}</p>    
                           :null
                           }
                              
                         </div>
                         <div
                           class="form-group mb-4"
                           className={`custom-input ${
                               errors.username ? "custom-input-error":""
                           }`}
                         >
                           <h6 for="#" className="color-text">Username</h6>
                           <a class="float-right" href="">
                             Forget password?
                           </a>
                           <Field
                             type="text"
                             class="form-control"
                             placeholder="Enter username"
                             name="username"
                             value={form.username  || ""}
                             onChange={handleChange}
                           />
                             {errors.username && touched.username
                           ?<p className="error">{errors.username}</p>    
                           :null
                           }        
                         </div>
                         <div
                           class="form-group mb-4"
                           className={`custom-input ${
                               errors.password ? "custom-input-error":""
                           }`}
                         >
                           <h6 for="#" className="color-text">Password</h6>
                           <Field
                             type="password"
                             class="form-control"
                             placeholder="Enter Password"
                             name="password"
                             value={form.password  || ""}
                             onChange={handleChange}
                           />  
                             {errors.password && touched.password
                           ?<p className="error">{errors.password}</p>    
                           :null
                           }           
                         </div>
                         <div
                           class="form-group"
                           className={`custom-input ${
                               errors.confirmPassword ? "custom-input-error":""
                           }`}
                         >
                           <h6 for="#" className="color-text">Confirm Password</h6>
                           <Field
                             type="password"
                             class="form-control"
                             placeholder="Confirm Password"
                             name="confirmPassword"
                             value={
                               form.confirmPassword  ||
                               ""
                             }
                             onChange={handleChange}
                           />
                            {errors.confirmPassword && touched.confirmPassword
                           ?<p className="error">{errors.confirmPassword}</p>    
                           :null
                           }                 
                         </div>
       
                         <button  class="btn btn-primary mt-3 btn-block"  type="submit" >
                           Signup
                         </button>
                       </form>
                    )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
      
}