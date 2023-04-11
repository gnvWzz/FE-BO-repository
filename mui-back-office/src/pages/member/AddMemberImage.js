import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import { Box,Button, Input,Snackbar } from "@mui/material";
import Header from "../../components/Header";

export default function AddMemberImage() {

  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  let { memberId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'rv1shgvx');

    axios
      .post('https://api.cloudinary.com/v1_1/dcib0t5my/image/upload', imageData)
      .then(
        (response) => {
        const imageUrl = response.data.secure_url;
        console.log(response.data.secure_url)

        axios
          .post(`http://localhost:8080/member/add-image/${memberId}`, 
            imageUrl
          )
          .then((response) => {
            console.log(response);
            console.log("imageUrl ",JSON.stringify (imageUrl));
            setImageUrl(imageUrl);
            setUploadSuccess(true);
            setMessage("Successfully uploaded");
          })
          .catch((error) => {
            setMessage("An error occurred while uploading the avatar");
            console.log("Error when setting member image ", error);
          });
      }
      )
      .catch((error) => {
        console.log(error);
      })
  };

 useEffect(() => {
  if (uploadSuccess) {
    // Set the image state with the uploaded image URL
    setImage(imageUrl);
    setUploadSuccess(false);
  }
}, [uploadSuccess, imageUrl, message]);

  return (
  <Box m="20px">
    <Header
      title="UPLOAD AVATAR"
      subtitle="Upload the avatar of excellent member"
    />
    <Box style={{ 
      backgroundImage: `url(https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-3-1.jpg)`, 
      backgroundPosition: 'center', 
      backgroundSize: 'cover',
      height: '100vh', 
      position: 'relative' }}>

      <Box style={{paddingTop: '2em'}}>
        <Box style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <form>
            {image ? (
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
                <img src={image} alt="Uploaded Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto', backgroundColor: '#ddd' }}>
                <span style={{ display: 'block', textAlign: 'center', paddingTop: '60px' }}>No Image Uploaded</span>
              </div>
            )}
            <hr></hr>
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <hr></hr>
            <Button class="btn" onClick={handleSubmit} style={{marginRight: "1em"}}>Upload Image</Button>
            <Button class="btn" onClick={e => navigate(`/member/list`)}>Return</Button>
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