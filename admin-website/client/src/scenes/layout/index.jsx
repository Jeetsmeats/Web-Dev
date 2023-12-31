// import items
import React, { useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

// import function to make api calls
import { useGetUserQuery } from "state/api";


const Layout = () => {

  const isNonMobile = useMediaQuery("(min-width: 600px");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const userId = useSelector((state) => state.global.userId); // get from redux base redux toolkit

  // make api call
  const { data } = useGetUserQuery(userId);
  console.log("🚀 ~ file: index.jsx:22 ~ Layout ~ data:", data)
  
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">     
      <Sidebar 
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen} 
      />     {/** Sidebar component */}
      <Box>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />      {/** Included in all pages */}
        <Outlet />      {/** Render child layouts of layout */}
      </Box>
    </Box>
  )
}

export default Layout;