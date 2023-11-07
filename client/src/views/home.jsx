import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";
import background from "../assets/background.png";
import mbackground from "../assets/mobilebackground.png";
import star from "../assets/staricon.png";
import icon1 from "../assets/icon1.png";
import "../font.css";
import { isMobile, isBrowser, isTablet } from "react-device-detect";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  Routes
} from "react-router-dom";

const font = "'Lato'";

// Custom styles
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    display: "block",
    textAlign: "left",
    backgroundColor: "#3f1f7d"
  },
  mobilesocials: {
    backgroundColor: "white",
    width: "50vh",
    height: "50vh",
    position: "fixed"
  }
}));

const Outdated = () => {
  // Declare State
  const classes = useStyles();

  return (
    <Box>
      <Box textAlign={`center`}>
        <Box>
          <Typography style={{
              color: "#8c53ff",
              // fontSize: "18vmin",
              fontSize: 92,
              userSelect: "none",
              fontFamily: 'Lato',
              fontWeight: "bold"
            }}
            // fontSize={{ xs: '72px', md: '92px' }}
            // fontSize={`92px`}
          >
            Vibe <span style={{ color: 'white'}}>Values</span>
          </Typography>
        </Box>
        <Box>
          <Typography
            style={{
              userSelect: "none",
              color: "white",
              fontSize: "10vmin",
              fontFamily: font
            }}
          >
            The #1 PSX Trading Site
          </Typography>
        </Box>
          <Button
            style={{
              boxShadow: "0px 0px 20px 20px rgba(143,143,143,0.10)",
              textAlign: "center",
              borderRadius: "2vmin",
              backgroundColor: "#7037e3",
              userSelect: "none",
              color: "white",
              fontSize: "6vmin",
              fontWeight: "bold",
              fontFamily: font,
              lineHeight: "8vmin"
            }}
          >
            <Link to="/values" style={{ color: 'white', textDecoration: 'none' }}>
              Check values now!
            </Link>
          </Button>
        </Box>
      <Box p={3} mt={4}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} display="flex">
            <Box display="flex" mb={3} justifyContent={`center`}>
              <Box textAlign={`center`}>
                <Box>
                  <Typography style={{
                    userSelect: "none",
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "10vmin",
                    fontFamily: font
                  }}>
                    Doodle Update
                  </Typography>
                </Box>
                <Box>
                  <Typography style={{
                    userSelect: "none",
                    fontWeight: "bold",
                    color: "#8c53ff",
                    fontSize: "10vmin",
                    fontFamily: font
                  }}>
                    OUT NOW!
                  </Typography>
                </Box>
                <Box display='flex' justifyContent={`center`}>
                  <Box
                    style={{
                      boxShadow: "0px 0px 20px 20px rgba(143,143,143,0.10)",
                      textAlign: "center",
                      borderRadius: "2vmin",
                      backgroundColor: "#7037e3",
                      width: "40vmin",
                      height: "7.5vmin",
                      userSelect: "none",
                      fontSize: "5vmin",
                      fontWeight: "bold",
                      fontFamily: font,
                      lineHeight: "7vmin"
                    }}
                  >
                    <Link to="/values" style={{ textDecoration: 'none', color: "white", }}>
                      Check values
                    </Link>
                  </Box>
                </Box>
              </Box>
              <Box display={{ xs:'none', md: "flex"}} flexDirection="column" justifyContent={`center`}>
                <img
                  draggable="False"
                  src={icon1}
                  alt="logo1"
                  style={{
                    height: "20vmin",
                    width: "19vmin",
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mb={3}>
              <Box ml={{ xs: 0,  md: 12}} textAlign={{ xs: 'center', md: 'left' }}>
                  <Typography style={{
                    userSelect: "none",
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "6.5vmin",
                    fontFamily: font
                  }}>
                    Why <span style={{color: "#8c53ff",}}>Vibe</span> is the <span style={{color: "#8c53ff",}}>best</span>
                  </Typography>
              </Box>
              <Box>
                <Box
                  style={{
                    width: '100%',
                    borderRadius: "6vmin",
                    backgroundColor: "#8a52fd",
                    height: "0.5vmin",
                    color: "white",
                    fontSize: "5vmin",
                    fontWeight: "bold",
                    fontFamily: font,
                    lineHeight: "7vmin"
                  }}
                ></Box>
              </Box>
              <Box>
                  <Box>
                    {['Daily updates', 'Accurate Values', 'Easily accessible'].map((text, index) => (
                      <Box display="flex" key={index} ml={{xs: 0, md: 12}} justifyContent={{ xs: 'center', md: 'start' }}>
                        <Box display="flex" flexDirection={`column`} justifyContent={`center`}>
                          <img
                            draggable="False"
                            src={star}
                            alt="logo1"
                            style={{
                              height: "5.5vmin",
                              width: "5.5vmin",
                            }}
                          />
                        </Box>
                        <Typography style={{
                          userSelect: "none",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: "6vmin",
                          fontFamily: font
                        }}>
                          {text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
};

export default Outdated;
