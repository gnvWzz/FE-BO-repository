import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { HttpStatusCode } from 'axios';
import { Box, Button, TextField, Typography, Snackbar} from "@mui/material";
import '../../components/ProductInfo.css'
import { Formik, Form , Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import CheckIcon from '@mui/icons-material/Check';

const updateDetailSchema = yup.object().shape({
  newSerialNumber: yup.string().required("SerialNumber is required"),
  })
const initialValues = {
  newSerialNumber: "",
  briefDescription: "",
  fullDescription: "",
  weight: "",
  material: "",
  cpu: "",
  gpu: "",
  ram: "",
  storageDrive: "",
  display: "",
  size_color_img_quantity: "",
};
function UpdateProductDetailInfo() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {accountUsername} = useParams();
  const {serialNumber} = useParams();
  const navigate = useNavigate();
  const [isComputer, setIsComputer] = useState(false);
  const [message, setMessage] = useState("");
  const [requestProductDetailInfoDto, setRequestProductDetailInfoDto] = useState({
    curSerialNumber: "",
    newSerialNumber: "",
    briefDescription: "",
    fullDescription: "",
    weight: "",
    material: "",
    cpu: "",
    gpu: "",
    ram: "",
    storageDrive: "",
    display: "",
    size_color_img_quantity: "",
  });
  const [sciq, setSciq] = useState({
    size: "",
    color: "",
    img: "",
    quantity: 0
  })
  const [image, setImage] = useState("");
  const [imgObjList, setImgObjList] = useState([]);
  const [isSetSciq, setIsSetSciq] = useState(false);
  const [backupImg, setBackupImg] = useState([]);

 useEffect(() => {
    loadProduct()
  }, [])

  useEffect(() => {
  }, [isSetSciq, message])
  
  const loadProduct = async () => {
    try {
      const res = await axios ({
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
          "Content-Type": "application/json",
        },
        url: `http://localhost:8080/api/productdetail/detail/${serialNumber}`,
        method: "GET",
      })
      if (res.status === HttpStatusCode.Ok) {
        console.log("response: ", res);
        const {size, color, img, quantity} = JSON.parse(res.data.size_color_img_quantity)
        setRequestProductDetailInfoDto(res.data)
        setRequestProductDetailInfoDto((prevState)=>({...prevState, curSerialNumber: res.data.serialNumber}))
// sử dụng prevState truyền vào hàm setter của setRequestProductDetailInfoDto đảm bảo các prop khác của state không bị thay đổi bởi các thay đổi khác
        setSciq({...sciq, size: size, color: color, img: img, quantity: quantity})
// neu khong nhap url thi su dung gia tri backupImg de setSCIQ
        setBackupImg(img)
        console.log("backupImg", img)
// xu ly hien thi giao dien theo category
        if(res.data.category === "Computer"){
          setIsComputer(true);
        }
      }
    } catch (err) {
      throw err;
    }
  };

    const saveDetailInfo = () => {
      console.log("requestProductDetailInfoDto: ", requestProductDetailInfoDto)
      axios ({
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
          "Content-Type": "application/json",
        },
        url: `http://localhost:8080/api/productdetail/update`,
        method: "PUT",
        data: requestProductDetailInfoDto,
      })
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            // console.log(res.status);
            navigate(`/product/${accountUsername}/${requestProductDetailInfoDto.newSerialNumber}`)
          }
        })
        .catch(err => {
          console.error(err);
          setMessage("This Serial Number was existed");
        });
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setRequestProductDetailInfoDto((prevState) => ({ ...prevState, [name]: value}));
    }

    function handleInputSciq(e){
      const {name, value} = e.target;
      setSciq((prevState) => ({...prevState, [name]: value}))
    }

    function handleInputUrl(e){
      setImage(e.target.value)
    }

    function addToImgObjList(){
      if (imgObjList.length === 0) {
        setImgObjList([...imgObjList, {
            id: 0,
            url: image
        }])
    } else {
        setImgObjList([...imgObjList, {
            id: imgObjList.length,
            url: image
        }])
      }
    }

    // function deleteThisImage(e){
    //   const tempList = imgObjList.filter((ele) => ele.id != e.target.value);
    //     setImgObjList(tempList);
    // }
    function clearImgList(){
      setImgObjList([])
    }

    function setImgListOfSciq(){
      console.log("Image List: ", imgObjList);
      if(imgObjList.length === 0){
        setSciq({...sciq, img: backupImg})
      } else{
        setSciq({...sciq, img: imgObjList})
      }
      setIsSetSciq(true);
    }

    function setSciqOfProductDetail(){
      const sciqJSON = JSON.stringify(sciq)
      // console.log("sciqJSON: ", sciqJSON)
      setRequestProductDetailInfoDto({...requestProductDetailInfoDto, size_color_img_quantity: sciqJSON})
    }

    return (
    <Box m="20px 30px 0 30px">
      <Header
        title="UPDATE DETAIL INFO"
        subtitle="Update product detail info"
      />
      <Formik
                    initialValues={initialValues}
                    validationSchema={updateDetailSchema}
                    onSubmit={saveDetailInfo}
                >
                {({
                    errors,
                    touched,
                    handleBlur, 
                    setFieldValue,
                    }) => (
                <Form>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        "& .Mui-error": {
                            color: "red"
                          }
                    }}
                    ml="20px" mr="20px"
                    >
                <Box sx={{ gridColumn: "span 1" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  SerialNumber*
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}
                    error={touched.newSerialNumber && !!errors.newSerialNumber}
                    helperText={touched.newSerialNumber && errors.newSerialNumber}
                    name="newSerialNumber"
                    placeholder={requestProductDetailInfoDto.curSerialNumber}
                    // label="Serial Number"
                    // value={requestProductDetailInfoDto.newSerialNumber}
                    onChange={(e) => {
                        setFieldValue("newSerialNumber", e.target.value);
                        handleInput(e);
                    }}
                    as={TextField}
                />
                </Box>
                <Box sx={{ gridColumn: "span 1" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  Stock
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="number"
                    onBlur={handleBlur}               
                    error={touched.quantity && !!errors.quantity}
                    helperText={touched.quantity && errors.quantity}
                    name="quantity"
                    placeholder={sciq.quantity}
                    onChange={(e) => {
                        setFieldValue("quantity", e.target.value);
                        handleInputSciq(e);
                    }}
                    as={TextField}
                />
                </Box>
                <Box sx={{ gridColumn: "span 1" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  Size
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}               
                    error={touched.size && !!errors.size}
                    helperText={touched.size && errors.size}
                    name="size"
                    placeholder={sciq.size}
                    onChange={(e) => {
                        setFieldValue("size", e.target.value);
                        handleInputSciq(e);
                    }}
                    as={TextField}
                />
                </Box>
                <Box sx={{ gridColumn: "span 1" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  Color
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}               
                    error={touched.color && !!errors.color}
                    helperText={touched.color && errors.color}
                    name="color"
                    placeholder={sciq.color}
                    onChange={(e) => {
                        setFieldValue("color", e.target.value);
                        handleInputSciq(e);
                    }}
                    as={TextField}
                />
                </Box>

                <Box sx={{ gridColumn: "span 1" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  Material
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}               
                    error={touched.material && !!errors.material}
                    helperText={touched.material && errors.material}
                    name="material"
                    placeholder={requestProductDetailInfoDto.material}
                    onChange={(e) => {
                        setFieldValue("material", e.target.value);
                        handleInput(e);
                    }}
                    as={TextField}
                />
                </Box>

                <Box sx={{ gridColumn: "span 3" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  BriefDescription
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}               
                    error={touched.briefDescription && !!errors.briefDescription}
                    helperText={touched.briefDescription && errors.briefDescription}
                    name="briefDescription"
                    placeholder={requestProductDetailInfoDto.briefDescription}
                    onChange={(e) => {
                        setFieldValue("briefDescription", e.target.value);
                        handleInput(e);
                    }}
                    as={TextField}
                />
                </Box>

                <Box sx={{ gridColumn: "span 1" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  Weight
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="number"
                    onBlur={handleBlur}               
                    error={touched.weight && !!errors.weight}
                    helperText={touched.weight && errors.weight}
                    name="weight"
                    placeholder={requestProductDetailInfoDto.weight}
                    onChange={(e) => {
                        setFieldValue("weight", e.target.value);
                        handleInput(e);
                    }}
                    as={TextField}
                />
                </Box>

                <Box sx={{ gridColumn: "span 3" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  FullDescription
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}               
                    error={touched.fullDescription && !!errors.fullDescription}
                    helperText={touched.fullDescription && errors.fullDescription}
                    name="fullDescription"
                    placeholder={requestProductDetailInfoDto.fullDescription}
                    onChange={(e) => {
                        setFieldValue("fullDescription", e.target.value);
                        handleInput(e);
                    }}
                    as={TextField}
                />
                </Box>
                

              <>
                  {isComputer ? 
                  <Box 
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{gridColumn: "span 4",
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        "& .Mui-error": {
                            color: "red"
                          }
                    }}
                    >
                  <Box sx={{ gridColumn: "span 2" }}>
                  <Typography style={{margin: "0 0 10px 10px"}}>
                    CPU
                  </Typography>
                  <Field
                      fullWidth
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}               
                      error={touched.cpu && !!errors.cpu}
                      helperText={touched.cpu && errors.cpu}
                      name="cpu"
                      placeholder={requestProductDetailInfoDto.cpu}
                      onChange={(e) => {
                          setFieldValue("cpu", e.target.value);
                          handleInput(e);
                      }}
                      as={TextField}
                  />
                  </Box>
                  <Box sx={{ gridColumn: "span 2" }}>
                  <Typography style={{margin: "0 0 10px 10px"}}>
                    RAM
                  </Typography>
                  <Field
                      fullWidth
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}               
                      error={touched.ram && !!errors.ram}
                      helperText={touched.ram && errors.ram}
                      name="ram"
                      placeholder={requestProductDetailInfoDto.ram}
                      onChange={(e) => {
                          setFieldValue("ram", e.target.value);
                          handleInput(e);
                      }}
                      as={TextField}
                  />
                  </Box>
                  <Box sx={{ gridColumn: "span 2" }}>
                  <Typography style={{margin: "0 0 10px 10px"}}>
                    GPU
                  </Typography>
                  <Field
                      fullWidth
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}               
                      error={touched.gpu && !!errors.gpu}
                      helperText={touched.gpu && errors.gpu}
                      name="gpu"
                      placeholder={requestProductDetailInfoDto.gpu}
                      onChange={(e) => {
                          setFieldValue("gpu", e.target.value);
                          handleInput(e);
                      }}
                      as={TextField}
                  />
                  </Box>
                  <Box sx={{ gridColumn: "span 2" }}>
                  <Typography style={{margin: "0 0 10px 10px"}}>
                    Storage Drive
                  </Typography>
                  <Field
                      fullWidth
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}               
                      error={touched.storageDrive && !!errors.storageDrive}
                      helperText={touched.storageDrive && errors.storageDrive}
                      name="storageDrive"
                      placeholder={requestProductDetailInfoDto.storageDrive}
                      onChange={(e) => {
                          setFieldValue("storageDrive", e.target.value);
                          handleInput(e);
                      }}
                      as={TextField}
                  />
                  </Box>
                  <Box sx={{ gridColumn: "span 2" }}>
                  <Typography style={{margin: "0 0 10px 10px"}}>
                    Display
                  </Typography>
                  <Field
                      fullWidth
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}               
                      error={touched.display && !!errors.display}
                      helperText={touched.display && errors.display}
                      name="display"
                      placeholder={requestProductDetailInfoDto.display}
                      onChange={(e) => {
                          setFieldValue("display", e.target.value);
                          handleInput(e);
                      }}
                      as={TextField}
                  />
                  </Box>
                </Box> : "" }
              </>
                  

                <Box sx={{ gridColumn: "span 2" }}>
                <Typography style={{margin: "0 0 10px 10px"}}>
                  Image URL
                </Typography>
                <Field
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}               
                    error={touched.img && !!errors.img}
                    helperText={touched.img && errors.img}
                    name="img"
                    // value={product.img}
                    onChange={(e) => {
                        // setFieldValue("img", e.target.value);
                        handleInputUrl(e);
                    }}
                    as={TextField}
                />
                </Box>

                <Box 
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                    sx={{gridColumn: "span 2",
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                        "& .Mui-error": {
                            color: "red"
                          }
                    }}
                    >
                
                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "flex-end",
                    gridRow: "2/2"
                  }}
                >
                <Button 
                    type='button'
                    startIcon={<AddPhotoAlternateIcon />}
                    onClick={addToImgObjList}
                    variant="contained" color="success" sx={{ width: '140px', height: '40px'}}>
                    Confirm Image
                </Button> 
                <Button 
                    type='button'
                    startIcon={<ClearAllIcon />}
                    onClick={clearImgList}
                    variant="contained" color="warning" sx={{ width: '150px', height: '40px', ml: '20px'}}>
                    Clear Image List
                </Button>
                </Box>
              </Box>

              <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "flex-end",
                  }}
                >
                <Typography>
                  If you have changed the size, color, quantity, or image, you need to click the 'setSCIQ' button
                </Typography>
              </Box>

              <Box sx={{
                    gridColumn: "span 2",
                  }}>
                  <table className='product-images-table'>
                    <tbody>
                      {imgObjList.map((i, index) => (
                          <tr>
                              <th>
                                  <h4>Image {index + 1}</h4>
                              </th>
                              <td>
                                  <img className='product-image-per-variant' src={i.url} alt='' height={"150px"}/>
                              </td>
                              {/* <td>
                                  <button type='button' className='btn btn-danger' value={i.id} onClick={deleteThisImage}>Delete</button>
                              </td> */}
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>

                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "flex-end",
                  }}
                >
                  <Box>
                    {isSetSciq ? 
                    <Button 
                      type='button'
                      startIcon={<CheckIcon />}
                      onClick={setSciqOfProductDetail}
                      variant="contained" color="info" sx={{ width: '140px', height: '40px', mr: "20px"}}>
                      Confirm SCIQ
                    </Button> :
                    <Button 
                        type='button'
                        startIcon={<BurstModeIcon />}
                        onClick={setImgListOfSciq}
                        variant="contained" color="success" sx={{ width: '140px', height: '40px', mr: "20px"}}>
                        Set SCIQ
                    </Button>}
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    sx={{ width: "100px", height: "40px", mr: "20px"}}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                  <Button 
                    type='button'
                    startIcon={<KeyboardReturnIcon />}
                    onClick={() => navigate(`/product/${accountUsername}/${serialNumber}`)} variant="contained" color="error" sx={{ width: '100px', height: '40px'}}>
                    Return
                    </Button>
                </Box>
              </Box>
            </Form>)}
          </Formik>
        <Snackbar
          open={!!message}
          autoHideDuration={5000}
          onClose={() => setMessage("")}
          message={message}
        />
      </Box>
    )
}

export default UpdateProductDetailInfo
