import React, { useEffect, useState } from "react";
import { Formik, Form,Field } from "formik";
import {useNavigate} from "react-router-dom";
import {Typography, Box,Link, Grid, Avatar, Button, TextField } from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import axios from "axios";

function SignUp() {

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
        .post(`http://localhost:8080/api/account/signup` ,form)
        .then((res) =>{

        })
        .catch((err)=>{
          throw err
        })
        alert("Đăng kí thành công! " )
          navigate(`/login`);
        
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


  return (
      <Box style={{ 
          backgroundImage: `url(https://th.bing.com/th/id/R.1be197b63c53030fce26346a00f42ea8?rik=jvhgIpJSlavEZQ&riu=http%3a%2f%2fwww.rewinddisco.co.uk%2fblog%2f9%2fDisco.jpg&ehk=DKn5lSuQE76wTq0xlJzwLsp3J0x7HKYTytdQJ87cT9o%3d&risl=&pid=ImgRaw&r=0)`, 
          backgroundPosition: 'center', 
          backgroundSize: 'cover',
          height: '100vh', 
          position: 'relative',
          margin: '0' }}
        component="main"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box style={{marginTop: "4em"}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h3">
          Sign Up
        </Typography>
                <Box>
                  <Typography>
                    Already have an account? <a href="/"> Login now</a>
                  </Typography>
                </Box>
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
                           <label for="#">Enter Email Address</label>
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
                           <label for="#">Enter username</label>
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
                           <label for="#">Enter Password</label>
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
                           <label for="#">Confirm Password</label>
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
       
                         <Button  class="btn"  type="submit" style={{marginTop: "1em"}} >
                           Signup
                         </Button>
                       </form>
                    )}
                </Formik>
        </Box>        
      </Box>
  );
}                         

export default SignUp;