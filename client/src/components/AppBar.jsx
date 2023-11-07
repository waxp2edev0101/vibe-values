import React, { useState } from "react"
import { Box, Typography, Button, Menu, MenuItem } from "@material-ui/core"
import { Link, useLocation } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'

import logo from "../assets/logo-1.png";

import { FaDiscord, FaTwitter } from "react-icons/fa";
import { SiRoblox } from "react-icons/si";
import MenuIcon from '@material-ui/icons/Menu';

const SocialIconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,

    '& a': {
        
        color: 'white',
    },

    '& button': {
        backgroundColor: '#3f1f7d',
        padding: '12px 24px',
    },
    // width: "100%",
    // height: "100%",
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.primary.contrastText,
    // fontSize: "1.5rem",
    // borderRadius: "50%",
    // textAlign: "center",
    "& a:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    }
}))

const MobileMenu = styled(Menu)(({ theme }) => ({
    
    '& .MuiMenu-paper': {
        top: `76px !important`,
        background: '#3f1f7d',
    },
    // '& .MuiListItem-root': {

    // },
}))
export const AppBar = () => {
    let location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const navigators = [
        { label: "Values", url: "/values", active: location.pathname === "/values" },
        { label: "Calculator", url: "/calculator", active: location.pathname === "/calculator" },
        { label: "Information", url: "/information", active: location.pathname === "/information" },
    ]
    return (
        <Box display="flex" width='100%' justifyContent={`space-between`} background={`#311a5f`} boxShadow={`0px 0px 40px -15px black`} height={112}>
            <Box display="flex" width='100%' justifyContent={{ xs: 'space-between', sm: 'space-between', md: `start` }}>
                <Box>
                    <Link to="/">
                        <img src={logo} alt="Logo" width={176} height={112} />
                    </Link>
                </Box>
                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: "flex" }}>
                    {navigators.map((item, index) => (
                        <Box key={index} display="flex" flexDirection={`column`} justifyContent={`center`} ml={4}>
                            <Link
                                to={item.url}
                                style={{
                                    color: item.active ? "#9853ff" : 'white',
                                    background: "transparent",
                                    textDecoration: "none",
                                    fontSize: 32,
                                    fontWeight: 'bold',
                                    fontFamily: 'Lato',
                                    lineHeight: '35px',
                                }}
                            >{item.label}</Link>
                        </Box>
                    ))}
                </Box>
                <Box display={{ sm: 'flex', md: 'none', lg: "none" }}>
                    <Box display="flex" flexDirection={`column`} justifyContent={`center`} height='100%' pr={4}>
                        <div>
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick}
                                style={{background: '#3f1e7e'}}
                            >
                                <MenuIcon />
                            </Button>
                            <MobileMenu
                                onClose={handleClose}
                                // elevation={0}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                anchorEl={anchorEl}
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}s
                                open={open}
                            >
                                {navigators.map((item, index) => (
                                    <MenuItem onClick={handleClose} disableRipple key={index}>
                                        <Link
                                            to={item.url}
                                            style={{
                                                color: item.active ? "#9853ff" : 'white',
                                                background: "transparent",
                                                textDecoration: "none",
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                                fontFamily: 'Lato',
                                                lineHeight: '35px',
                                            }}
                                        >{item.label}</Link>
                                    </MenuItem>
                                ))}
                            </MobileMenu>
                        </div>
                        {/* <BasicMenu /> */}
                    </Box>
                </Box>
            </Box>
            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: "flex" }}>
                <SocialIconBox>
                    <a href="https://discord.gg/" target="_blank">
                        <FaDiscord style={{ height: "6vmin", width: "6vmin" }} />
                    </a>
                </SocialIconBox>
                <SocialIconBox>
                    <a href="https://twitter.com/" target="_blank">
                        <FaTwitter style={{ height: "5vmin", width: "5vmin" }} />
                    </a>
                </SocialIconBox>
                <SocialIconBox>
                    <a href="https://roblox.com/" target="_blank">
                        <SiRoblox style={{ height: "4.5vmin", width: "4.5vmin" }} />
                    </a>
                </SocialIconBox>
                <SocialIconBox>
                    <Button variant="contained">
                        <a href="https://discord.com/" style={{ fontWeight: 'bold', textDecoration: 'none' }} target="_blank">
                            BOT
                        </a>
                    </Button>
                </SocialIconBox>
                
            </Box>
        </Box>
    )
}
