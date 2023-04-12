import React, {useState, useEffect} from 'react'
import axios,{HttpStatusCode} from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ReactPaginate from 'react-paginate';
import "../../components/Pagination.css"

const EmptyFooter = () => {
  return null;
}

export default function ProductList (){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const columns = [
  { field: "serialNumber", headerName: "Serial Number", flex: 0.5 },
  { field: "image", headerName: "Image", width: 70 ,renderCell: (params)=>{
    if(params.row.image){
    const encodedString = params.row.image; // chuỗi mã hóa
      const lastChar = encodedString.charAt(encodedString.length - 1); // lấy ký tự cuối cùng
      const numPadChars = (lastChar === "=" ? 1 : 0) + (lastChar === "==" ? 1 : 0); // tính số ký tự đệm bị bỏ qua
      const encodedWithoutPadding = encodedString.slice(0, -numPadChars); // xóa các ký tự đệm
      // Bổ sung kiểm tra chuỗi mã hóa rỗng trước khi giải mã
      const decodedString = encodedWithoutPadding ? JSON.parse(decodeURIComponent(encodedWithoutPadding)) : [];
      console.log(decodedString[0]);
      return (
        <img src={decodedString[0]} alt='Product Pic' onClick={() => {navigate(`/bo/product/${params.row.id}`)}} style={{width:"40px", height:"40px"}}/>
    )
    } else {
        return(
          <img src={"https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU="} alt='Product Pic' onClick={() => {navigate(`/bo/product/${params.row.id}`)}} style={{width:"40px", height:"40px"}}/>
        )
      }
  }},
  //Mac du image la bac buoc, nhung if-else trong truong hop mat url trong database thi khong xay ra loi TypeError: null tren FE
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    flex: 1,
  },
  {
    field: "id",
    headerName: "Status",
    type: "button",
    flex: 0.5,
    renderCell: (params)=>{
      const handleBlockClick = () => {
        console.log(params.row.id);
        axios.post(`http://localhost:8080/bo/product/block/${params.row.id}`)
          .then(res => {
            if (res.status === HttpStatusCode.Ok) {
              // console.log(res.status);
            }
          })
          .catch(err => {
            console.error(err);
          });
          setIsBlocked(!isBlocked)
      };
      return (
          <Button onClick={handleBlockClick} style={{ backgroundColor: params.row.status === "BLOCKED" ? "brown" : "white", color: params.row.status === "BLOCKED" ? "white" : "black" }}>{params.row.status}</Button>
      )
    }
  }
];

  useEffect(() => {
    loadProducts();
  }, [currentPage, isBlocked]);

  const loadProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bo/product/list?page=${currentPage}`);
      console.log(response.data.content);
      setProducts(response.data.content);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <Box m="20px">
      <Header
        title="PRODUCTS"
        subtitle="List of Product for Future Reference"
      />
      <button onClick={() => {navigate("/bo/product/add")}}>
        CREATE NEW PRODUCT
      </button>
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          rows={products}
          columns={columns}
          pagination
          components={{
            Toolbar: GridToolbar,
            Footer: EmptyFooter,
          }}
        />
        
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </Box>
    </Box>
  );
};
