import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import { Box,Button,Snackbar } from "@mui/material";
import Header from "../../components/Header";
import { BACKGROUND_URL } from '../../components/URLS/url';
function UpdateStoreName() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const {state} = useLocation();
  // console.log(state);
  const [requestDto, setRequestDto] = useState({});
  const navigate = useNavigate();
  let { accountUsername } = useParams();

  const handleInput = (e) => {
    setRequestDto({...requestDto, [e.target.name]: e.target.value})
  }
  const handleSubmit = (event) => {
    event.preventDefault();
        axios ({
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
            "Content-Type": "application/json",
          },
          url: `http://localhost:8080/api/store/update-name`,
          method: "POST",
          data: {...requestDto, curName: state.store.curName},
        })
          .then((response) => {
            navigate(`/store/${accountUsername}`)
            // console.log(response);
            // setUploadSuccess(true);
            // setMessage("Successfully uploaded");
          })
          .catch((error) => {
            setMessage("This name was existed");
            // setMessage("An error occurred while setting store name");
            console.log("Error when setting store name ", error);
          });
  };

 useEffect(() => {
  if (uploadSuccess) {
    setUploadSuccess(false);
  }
}, [uploadSuccess, message]);

    return (
    <Box m="20px 30px 0 30px">
      <Header
        title="UPDATE STORE INFO"
        subtitle="Update the name and image of the store"
      />
      <Box style={{ 
        backgroundImage: `url(${BACKGROUND_URL})`, 
        backgroundPosition: 'center', 
        backgroundSize: 'cover',
        height: '90vh', 
        position: 'relative' }}>

        <Box style={{paddingTop: '2em'}}>
          <Box style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <form>
              <input name='newName' onChange={handleInput} placeholder="Input the new store name"></input>
              <hr></hr>
              <Button onClick={handleSubmit} variant="contained" color="primary" style={{marginRight: "20px", width: "112px", height: "36px"}}>
                Save
              </Button>
              <Button onClick={e => navigate(`/store/${accountUsername}`)} variant="contained" color="error" style={{width: "112px", height: "36px"}}>
                Return
              </Button>
              {/* <Button class="btn" onClick={e => navigate(`/store/${accountUsername}`)}>Return</Button> */}
            </form>
          </Box>
        </Box>
        
      </Box>
      <Snackbar
          open={!!message}
          autoHideDuration={5000}
          onClose={() => setMessage("")}
          message={message}
        />
    </Box>
    )
}

export default UpdateStoreName
