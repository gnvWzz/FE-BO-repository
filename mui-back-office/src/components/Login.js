import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Typography, Box,Link, Grid, Avatar, Button, TextField } from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
// import { error } from "jquery";
// import { fakeLogin } from "../redux/action";

function Login() {
  const REGEX = {
    //username có ít nhất 8 kí tự dài nhất 20 kí tự, không có các dấu chấm . _ ở đầu tên giữa và cuối tên
    usernameRegex: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //email tuân theo RFC 2822
    passwordRegex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [msgError, setmsgError] = useState({
    username: "",
    password: "",
    confirm: "",
  });

  // useEffect(() => {
  //   if (isLogin) {
  //     setIsLogin(false);
  //     navigate("/");
  //   }
  // }, [isLogin]);

  // useEffect(() =>{
  //   if(user.username){
  //     navigate(`/`);
  //   }
  // },[user,navigate])

  // const login = () => {
  //   dispatch(fakeLogin(form));
  // };
  // ,{headers:{Authorization:`Bearer` + token}}

  const handleSubmit = () => {
    // axios
    // .post(`http://localhost:8080/api/account/login`,form
    // )
    // .then((res) => {
    //   if(res.data !== ""){
    //     localStorage.setItem("token", res.data)
    //     // setToken(res.data);
    //   }else{
    //     // setmsgError(...msgError, confirm : "Tài Khoản hoặc Mật Khẩu chưa đúng!");
    //     setmsgError(msgError =>{
    //       return{
    //         ...msgError,confirm:"Tài khoản hoặc mật khẩu không đúng!"
    //       }})
    //   }
    // })
    // .catch((err) => {
    //   throw err;
    // });

    // if(localStorage.getItem("token") !=""){
    //   navigate(`/`);
    // }

    axios({
      url: `http://localhost:8080/api/account/login`,
      method: "POST",
      responseType: "json",
      contentType: "application/json",
      data: form,
    })
      .then(function (response) {
        console.log("status" +response.status);
        console.log("data" +response.data);
        if (response.data !== "") {
          localStorage.setItem("token", response.data);
        }
      })
      .catch(function (err) {
        alert("Sai thông tin đăng nhập!");
        console.log(err.response);
      });

      if(localStorage.getItem("token") !==""){
        navigate(`/`);
      }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const handleValidate = ()=> {
  //   const errors = {
  //     username: "",
  //     password: "",
  //   };
  //   if (!form.username) {
  //     errors.username = "Bắt buộc";
  //   }
  //   if (!form.password) {
  //     errors.password = "Bắt buộc";
  //   }
  //   setmsgError(errors);
  //   return errors;
  // }

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
          Sign in
        </Typography>
                  <p className="lead">
                    Don’t have an account? <a href="/signup">Create a free account</a>
                  </p>
                <Formik
                  initialValues={form}
                  // validate={handleValidate}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                      <div
                        class="form-group mb-4"
                        className={`custom-input ${
                          errors.username ? "custom-input-error" : ""
                        }`}
                      >
                        <label for="#">Enter username</label>
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="Enter Username"
                          name="username"
                          value={form.username || ""}
                          onChange={handleChange}
                        />
                        {errors.username && touched.username ? (
                          <p className="error">{msgError.username}</p>
                        ) : null}
                      </div>
                      <div
                        class="form-group"
                        className={`custom-input ${
                          errors.password ? "custom-input-error" : ""
                        }`}
                      >
                        <label for="#">Enter Password</label>
                        <Field
                          type="password"
                          className="form-control"
                          placeholder="Enter Password"
                          name="password"
                          value={form.password || ""}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password ? (
                          <p className="error">{msgError.password}</p>
                        ) : null}
                      </div>
                      <div>
                        {msgError.confirm !== "" ? (
                          <p className="error">{msgError.confirm}</p>
                        ) : null}
                      </div>
                      {/* <button
                        type="submit"
                        className="btn btn-main mt-3 btn-block"
                      >
                        Login
                      </button> */}
                      <Button type="submit" class ="btn"  style={{marginTop: "1em"}}>
                        Login
                      </Button>
                    </form>
                  )}
                </Formik>
                <Box>
                    <a className="float-right" href="">
                          Forgot password?
                        </a>
                </Box>
      </Box>        
    </Box>
  );
}
export default Login;
