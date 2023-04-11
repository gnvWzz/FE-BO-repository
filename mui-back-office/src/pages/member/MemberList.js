import React, {useState, useEffect} from 'react'
import axios,{HttpStatusCode} from 'axios'
import {useNavigate} from 'react-router-dom'
import { Box,Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ReactPaginate from 'react-paginate';
import "../../components/Pagination.css"

const EmptyFooter = () => {
  return null;
}
export default function MemberList (){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [members, setMembers] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { field: "image", headerName: "Image", width: 70 ,renderCell: (params)=>{
      // console.log(params.row.image)
      const encodedString = params.row.image; // chuỗi mã hóa
      const lastChar = encodedString.charAt(encodedString.length - 1); // lấy ký tự cuối cùng
      const numPadChars = (lastChar === "=" ? 1 : 0) + (lastChar === "==" ? 1 : 0); // tính số ký tự đệm bị bỏ qua
      const encodedWithoutPadding = encodedString.slice(0, -numPadChars); // xóa các ký tự đệm
      const decodedString = decodeURIComponent(encodedWithoutPadding);
      return (
          <img src={decodedString} alt='' onClick={() => {navigate(`/member/${params.row.id}`)}} style={{width:"40px", height:"40px"}}/>
        )
      }
    },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 0.7,
    },
    {
      field: "landline",
      headerName: "Land Line",
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      type: "button",
      flex: 0.5,
      renderCell: (params)=>{
        const handleBlockClick = () => {
          // console.log(params.row.id);
          axios.post(`http://localhost:8080/member/block/${params.row.id}`)
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
    loadMembers();
  }, [currentPage, isBlocked]);

  const loadMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/member/list?page=${currentPage}`);
      setMembers(response.data.content);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
    <Box m="20px">
      <Header
        title="MEMBERS"
        subtitle="List of Member for Future Reference"
      />
      <button onClick={() => {navigate("/member/add")}}>
        CREATE NEW MEMBER
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
          rows={members}
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
    </>
  );
};
