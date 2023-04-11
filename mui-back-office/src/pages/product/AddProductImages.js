import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Input, Snackbar } from "@mui/material";
import Header from "../../components/Header";

export default function AddProductImages() {
  const [images, setImages] = useState([]);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [formDataArray, setFormDataArray] = useState([]);

  const navigate = useNavigate();
  const { productId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    Promise.all(
      formDataArray.map((formData) =>
        axios.post(
          "https://api.cloudinary.com/v1_1/dcib0t5my/image/upload",
          formData
        )
      )
    )
      .then((responses) => {
        const imageUrls = responses.map(
          (response) => response.data.secure_url
        );
        console.log(imageUrls);
        axios
          .post(`http://localhost:8080/bo/product/add-image/${productId}`,
                JSON.stringify (imageUrls))   //chuyển đổi mảng JavaScript thành chuỗi JSON
          .then((response) => {
            // setUploadSuccess(true);
            setMessage("Successfully uploaded");
          })
          .catch((error) => {
            setMessage("An error occurred while uploading the images");
            console.log("Error when setting product images ", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleImageChange = (event) => {
    const selectedImages = event.target.files;
    const imageList = [];
  
    for (let i = 0; i < selectedImages.length; i++) {
      imageList.push(selectedImages[i]);
    }
  
    Promise.all(
      imageList.map((image) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => {
            const imageData = new FormData();
            imageData.append("file", image);
            imageData.append("upload_preset", "rv1shgvx");
            resolve(imageData);
          };
          reader.onerror = (error) => reject(error);
        })
      )
    )
      .then((formDataArray) => {
        setImages((prevImages) => [...prevImages, ...imageList]);
        setFormDataArray((prevFormDataArray) => [...prevFormDataArray, ...formDataArray]); // gán formDataArray vào state
      })
      .catch((error) => console.log(error));
  };
  return (
    <Box m="20px">
      <Header
        title="UPLOAD IMAGES"
        subtitle="Upload the images of perfect product"
      />
      <Box
        style={{
          backgroundImage: `url(https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-3-1.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box style={{ paddingTop: "2em" }}>
          <Box
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <form>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto",
                      backgroundColor: "#ddd",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
              <hr />
              <Input
                type="file"
                multiple
                onChange={handleImageChange} 
              />
              <hr />
              <Button
                class="btn"
                onClick={handleSubmit}
                style={{ marginRight: "1em" }}
              >
                Upload Image
              </Button>
              <Button
                class="btn"
                onClick={(e) => navigate(`/bo/product/list`)}
              >
                Return
              </Button>
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
  );
}

