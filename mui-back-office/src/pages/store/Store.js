import React, {useState, useEffect} from 'react'
import {useNavigate, useParams, useLocation} from 'react-router-dom'
import axios,{HttpStatusCode} from 'axios';
import { Grid, Paper, Typography, Box, Button, ButtonGroup,ClickAwayListener
,Grow,Popper, MenuItem, MenuList} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import ReactPaginate from 'react-paginate';
import { ArrowDropDown } from '@mui/icons-material';
// import {FcCalendar} from "react-icons/fc"
import "../../components/Pagination.css"
import { NOTFOUND_URL } from '../../components/URLS/url';


const EmptyFooter = () => {
  return null;
}
const options = ['Create new product', 'Change store name', 'Upload store avatar'];

function Store() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [store, setStore] = useState({});
    const {accountUsername} = useParams();
    const [responseProductDetailDtoList
        , setResponseProductDetailDtoList
    ] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 5;
    const [isClickRemove, setIsClickRemove] = useState(false);
    const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const {state} = useLocation();

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    if(index == 0){
      navigate(`/store/product/${accountUsername}`, {state: {store}})
    }
    if(index == 1){
      navigate(`/store/name/${accountUsername}`, {state: {store}})
    }
    if(index == 2){
      navigate(`/store/image/${accountUsername}`, {state: {store}})
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

    function getCurrentItems() {
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      console.log("items:",responseProductDetailDtoList);
      return responseProductDetailDtoList.slice(startIndex, endIndex);
    }

    useEffect(() => {

      loadStore()
    },[isClickRemove])


    const columns = [
      { field: "id", headerName: "#", flex: 0.2 },
        { field: "img", headerName: "Image", width: 70 
        ,renderCell: (params)=>{
          if(params.row.img){
          const ObjImg = params.row.img[0];
          // xac dinh ObjImg.url undefined
          const url = ObjImg ? ObjImg.url : NOTFOUND_URL;
          // console.log("Image url: ", url)
           return   <img src={url} onClick={() => navigate(`/product/${accountUsername}/${params.row.serialNumber}`)} alt=''style={{width:"40px", height:"40px"}}/>
           
        }
      }},
      {
          field: "serialNumber",
          headerName: "Serial Number",
          flex: 1,
          cellClassName: "name-column--cell",
          headerAlign: "left",
          align: "left",
        },
        {
          field: "standardPrice",
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
              await axios({
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
                  "Content-Type": "application/json",
                },
                url: `http://localhost:8080/api/productdetail/remove/${params.row.serialNumber}`,
                method: "POST",
              })
              // await axios.post(`http://localhost:8080/api/productdetail/remove/${params.row.serialNumber}`)
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
          const res = await 
          axios({
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("tokenOwner")}`,
              "Content-Type": "application/json",
            },
            url: `http://localhost:8080/api/store/${accountUsername}`,
            method: "GET",
          })
          if (res.status === HttpStatusCode.Ok) {
            console.log("res.data", res.data);
            setStore({curName: res.data.name, image: res.data.image});
            setResponseProductDetailDtoList(res.data.responseProductDetailDtoList)
            // console.log(res.data.responseProductDetailDtoList)
            const products = res.data.responseProductDetailDtoList.map((product, index) => {
              const {  size, color, img,quantity } = JSON.parse(product.size_color_img_quantity);
              console.log(JSON.parse(product.size_color_img_quantity))
              return {
                ...product,
                id: index + 1,
                size,
                color,
                img,
                quantity
              };
            });
            
            setResponseProductDetailDtoList(products);
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
        <Box m="0 0 20px 20px">
        <Grid container direction="column" alignItems="left">
          <Grid item xs={12}>
            <ButtonGroup variant="contained" color="info" ref={anchorRef} aria-label="split button">
              <Button>{options[selectedIndex]}</Button>
              <Button
                color="info"
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDown />
              </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu">
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Grid>
      </Box>
          <Paper>
            <Typography variant="h2" align="center" style={{maxWidth: "100%", height: "2em", padding: "0.5em", backgroundColor: "orange", color: "black"}}>
                {store.curName}
            </Typography>
            <Box>
              <img alt="Product Pic" src={store.image} style={{maxWidth: "100%", height: "auto", padding: "1em", backgroundColor: "orange"}}/>
            </Box>
          </Paper>
        </Grid>

        <Grid sx={{ gridColumn: "span 2" }}>
          {/* <Typography variant='h3' align='right'>
            <FcCalendar onClick={() => navigate(`/calendar/${accountUsername}`)} style={{width: "50px", height: "50px"}}/> Calendar</Typography> */}
          <Typography variant="h2" align="center" style={{maxWidth: "100%", height: "2em", padding: "0.5em", backgroundColor: "skyblue", color: "purple"}}>
              Your products
          </Typography>
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
            pageCount={Math.ceil(responseProductDetailDtoList.length / ITEMS_PER_PAGE)}
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
