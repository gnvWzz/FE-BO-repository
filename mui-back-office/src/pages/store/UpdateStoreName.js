import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import { Box,Button, Input,Snackbar } from "@mui/material";
import Header from "../../components/Header";

function UpdateStoreName() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const [requestDto, setRequestDto] = useState({});
  const navigate = useNavigate();
  let { storeId } = useParams();

  const handleInput = (e) => {
    setRequestDto({...requestDto, [e.target.name]: e.target.value})
  }
  const handleSubmit = (event) => {
    event.preventDefault();

        axios
          .post(`http://localhost:8080/api/store/update-name`, 
          {...requestDto, curName: location.state.store.curName}
          )
          .then((response) => {
            console.log(response);
            setUploadSuccess(true);
            setMessage("Successfully uploaded");
          })
          .catch((error) => {
            setMessage("An error occurred while setting store name");
            console.log("Error when setting store name ", error);
          });
  };

 useEffect(() => {
  if (uploadSuccess) {
    setUploadSuccess(false);
  }
}, [uploadSuccess, message]);

    return (
        <Box m="20px">
    <Header
      title="UPDATE STORE INFO"
      subtitle="Update the name and image of the store"
    />
    <Box style={{ 
      backgroundImage: `url(https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-3-1.jpg)`, 
      backgroundPosition: 'center', 
      backgroundSize: 'cover',
      height: '90vh', 
      position: 'relative' }}>

      <Box style={{paddingTop: '2em'}}>
        <Box style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <form>
            <input name='newName' onChange={handleInput} placeholder="Input the new store name"></input>
            <hr></hr>
            <Button class="btn" onClick={handleSubmit} style={{marginRight: "1em"}}>Save</Button>
            <Button class="btn" onClick={e => navigate(`/store/${storeId}`)}>Return</Button>
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
