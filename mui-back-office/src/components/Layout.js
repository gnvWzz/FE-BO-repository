import { Box, useMediaQuery } from "@mui/material";

import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import SideBar from "./SideBar";
import Topbar from "./Topbar";


function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <SideBar
        user={{}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
    
      <Box flexGrow={1}>
        <Topbar/>
        <Outlet />
      </Box>
    </Box>
    // : <Navigate to="/login" />
  );
}

export default Layout;