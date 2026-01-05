import React, { useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, 
    SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from '../state/index.js'
import pImage from '../assets/l2.jpeg'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme,  } from '@mui/material'

const Navbar = ({user, isSidebarOpen, setIsSidebarOpen}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);


  return (
    <AppBar 
    sx={{
        position: "static", 
        background: "none", 
        boxShadow: "none",
    }}>
        <Toolbar sx={{ justifyContent: 'space-between'}}>
            {/* LEFT SIDE */}
            <FlexBetween>
                <IconButton onClick={()=> setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon/>
                </IconButton>
                {/* <FlexBetween backgroundColor={theme.palette.background.alt}
                borderRadius="9px" gap="0.5rem" p="0.1rem 1rem"
                >
                    <InputBase placeholder='Search...'/>
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween> */}
                <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="9px"
                    px="1rem"
                    sx={{ width: { xs: "100px", sm: "250px" } }}
                    >
                    <InputBase
                        placeholder="Search..."
                        sx={{ flex: 1 }}
                    />
                    <IconButton size="small">
                        <Search />
                    </IconButton>
                </Box>
            </FlexBetween>

            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlined sx={{ fontSize: "25px"}}/>
                    ) : (
                        <LightModeOutlined sx={{ fontSize: "25px"}}/>
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontSize: "25px"}}/>
                </IconButton>

                <FlexBetween>
                    <Button onClick={handleClick} sx={{ display: "flex", 
                        justifyContent: "space-between", alignItems: "center",
                        gap: "1px", textTransform: "none" }}>
                            <Box component="img" alt="profile" src={pImage} height="32px" width="32px" 
                                borderRadius="50%" sx={{objectFit: "cover"}}/>

                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.85rem" sx={{color: theme.palette.secondary[100]}}>
                                    {user.name}
                                </Typography>
                                <Typography fontSize="0.75rem" sx={{color: theme.palette.secondary[200]}}>
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: '25px'}}/>
                    </Button>
                    <Menu anchorEl={anchorEl} open={isOpen} 
                    onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center"}}>
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
