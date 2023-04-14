import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios,{HttpStatusCode} from 'axios';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import ReactPaginate from 'react-paginate';
import "../../components/Pagination.css"
import { async } from 'q';

const EmptyFooter = () => {
  return null;
}
function Store() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [store, setStore] = useState({});
    const {manufacturerId} = useParams();
    const [responseProductSFDetailDtoList
        , setResponseProductSFDetailDtoList
    ] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 4;
    const [isClickRemove, setIsClickRemove] = useState(false);
    console.log(isClickRemove)
    function getCurrentItems() {
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return responseProductSFDetailDtoList.slice(startIndex, endIndex);
    }

    useEffect(() => {
      loadStore()
    },[isClickRemove])

    const columns = [
      { field: "id", headerName: "#", flex: 0.2 },
        { field: "img", headerName: "Image", width: 70 
        ,renderCell: (params)=>{
          if(params.row.img){
          const ImgURL = params.row.img; // chuỗi mã hóa
          return (
              <img src={ImgURL[0]} alt=''style={{width:"40px", height:"40px"}}/>
            )} else {
              return(
                <img src={"https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU="} alt='Product Pic' onClick={() => {navigate(`/bo/product/${params.row.id}`)}} style={{width:"40px", height:"40px"}}/>
              )
            }
        }
      },
      {
          field: "serialNumber",
          headerName: "Serial Number",
          flex: 1,
          cellClassName: "name-column--cell",
          headerAlign: "left",
          align: "left",
        },
        {
          field: "price",
          headerName: "Price",
          flex: 1,
        },
        {
          field: "quantity",
          headerName: "Quantity",
          flex: 0.7,
        },
        {
          field: "remove",
          headerName: "Remove",
          type: "button",
          flex: 0.5,
          renderCell: (params)=>{
            const handleRemoveClick = async () => {
              console.log(params.row.serialNumber);
              await axios.post(`http://localhost:8080/api/productdetail/remove/${params.row.serialNumber}`)
                .then(res => {
                  if (res.status === HttpStatusCode.Ok) {
                    // console.log(res.status);
                    setIsClickRemove(prevState => !prevState);
                  }
                })
                .catch(err => {
                  console.error(err);
                });
                // window.location.reload();
            };
            return (
                <Button onClick={handleRemoveClick} style={{ backgroundColor: "brown", color: "white"}}>REMOVE</Button>
            )
          }
        }
    ];


    const loadStore = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/api/store/${manufacturerId}`);
          if (res.status === HttpStatusCode.Ok) {
            console.log("res.data", res.data);
            setStore(res.data);
            setResponseProductSFDetailDtoList(res.data.responseProductSFDetailDtoList)
            // console.log(res.data.responseProductSFDetailDtoList)
            const products = res.data.responseProductSFDetailDtoList.map((product, index) => {
              const {  size, color, img,quantity } = JSON.parse(product.size_color_img_quantity);
              return {
                ...product,
                id: index + 1,
                size,
                color,
                img,
                quantity
              };
            });
            
            setResponseProductSFDetailDtoList(products);
          }
        } catch (err) {
          throw err;
        }
      };
    

      return (
        <Box m="20px">
      <Header
          title="STORE INFO"
          subtitle="Store Info for Future Reference"
        />
      <Box
        display="grid"
        gap="20px" marginLeft={"20px"} marginRight={"20px"}
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
        }}
      >
        
        <Grid sx={{ gridColumn: "span 1" }}>
          <Paper>
            <Typography variant="h2" align="center">
                {store.name}
            </Typography>
            <Box>
              <img alt="Product Pic" src={store.image} style={{maxWidth: "100%", height: "auto", padding: "1em"}}/>
            </Box>
          </Paper>
        </Grid>

        <Grid sx={{ gridColumn: "span 2" }}>
              <Box
        m="0px 0 0 0"
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={getCurrentItems()}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
            Footer: EmptyFooter,
          }}
        />

      </Box>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(responseProductSFDetailDtoList.length / ITEMS_PER_PAGE)}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      </Grid>
      
     </Box>
    </Box>
    )
}

export default Store
