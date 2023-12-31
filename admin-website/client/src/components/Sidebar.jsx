// import items
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from './FlexBetween';
import profileImage from "assets/profile.jpeg";

import {        // mui components
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";

import {        // icons
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    AdminPanelSettingsOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    TrendingUpOutlined,
    PieChartOutlined
} from "@mui/icons-material";

const navItems = [          // navigation items
    {   
      text: "Dashboard",            
      icon: <HomeOutlined />,
    },
    {
      text: "Client Facing",        // client section
      icon: null,
    },
    {
      text: "Products",
      icon: <ShoppingCartOutlined />,
    },
    {
      text: "Customers",
      icon: <Groups2Outlined />,
    },
    {
      text: "Transactions",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "Geography",
      icon: <PublicOutlined />,
    },
    {
      text: "Sales",                // sales section
      icon: null,
    },
    {
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    {
      text: "Daily",
      icon: <TodayOutlined />,
    },
    {
      text: "Monthly",
      icon: <CalendarMonthOutlined />,
    },
    {
      text: "Breakdown",
      icon: <PieChartOutlined />,
    },
    {   
      text: "Management",           // management section
      icon: null,
    },
    {
      text: "Admin",
      icon: <AdminPanelSettingsOutlined />,
    },
    {
      text: "Performance",
      icon: <TrendingUpOutlined />,
    },
  ];

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {

    const { pathname } = useLocation();     // current location path
    const [active, setActive] = useState("");       // current page
    const navigate = useNavigate();             // navigate to other pages
    const theme = useTheme();       // get web theme

    useEffect(() => {
        setActive(pathname.substring(1));   // change in url will set active to current url
    }, [pathname]);

  return (
    <Box component="nav">
          {isSidebarOpen && (
              <Drawer
                  open={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                  variant="persistent"
                  anchor="left"
                  sx={{
                      width: drawerWidth,
                      "& .MuiDrawer-paper": {
                          color: theme.palette.secondary[200],
                          backgroundColor: theme.palette.background.alt,
                          boxSixing: "border-box",
                          borderWidth: isNonMobile ? 0 : "2px",
                          width: drawerWidth
                      }
                  }} >
                    <Box width="100%">
                      <Box m="1.5rem 2rem 2rem 3rem">
                          <FlexBetween color={theme.palette.secondary.main}>
                              <Box display="flex" alignItems="center" gap="0.5rem">
                                  <Typography variant="h4" fontWeight="bold">
                                      ECOMVISION
                                  </Typography>
                              </Box>
                              {!isNonMobile && (
                                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                      <ChevronLeft />
                                  </IconButton>
                              )}
                          </FlexBetween>
                      </Box>
                      <List>
                          {navItems.map(({ text, icon }) => {
                              if (!icon) {
                                  return (
                                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                          {text}
                                      </Typography>
                                  )
                              }

                              const lcText = text.toLowerCase();

                              return (
                                  <ListItem key={text} disablePadding>
                                    <ListItemButton
                                          onClick={() => {          // navigate to page based from item button
                                              navigate(`${lcText}`);
                                              setActive(lcText);            // set the current page
                                          }}
                                          sx={{
                                              backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                              color: active === lcText
                                                      ? theme.palette.primary[600]
                                                      : theme.palette.secondary[100]
                                          }}
                                      >
                                          <ListItemIcon
                                              sx={{
                                                  ml: "2rem",
                                                  color: active === lcText
                                                      ? theme.palette.primary[600]
                                                      : theme.palette.secondary[200]
                                              }}
                                          >
                                              {icon}
                                          </ListItemIcon>
                                          <ListItemText primary={text} />
                                          {active === lcText && (
                                              <ChevronRightOutlined sx={{ ml: "auto" }} />
                                          )}
                                    </ListItemButton>
                                  </ListItem>
                              )
                          })}
                      </List>
                    </Box>
                </Drawer>
        )}
    </Box>
  )
}

export default Sidebar