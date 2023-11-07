import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Grid } from '@material-ui/core'
import background from "../assets/valuesbg.png";
import mbackground from "../assets/mobilebackground.png";
import star from "../assets/staricon.png";
import icon1 from "../assets/icon1.png";
import homeIcon from "../assets/home.png";
import doubleArrow from "../assets/doubleArrow.png";
import underarrow from "../assets/underarrow.png";
import searchBar from "../assets/search.png";
import Dropdown from "../modules/dropdown.jsx";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Textfit } from 'react-textfit';


import "../font.css";
import { isMobile, isBrowser, isTablet } from "react-device-detect";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  Routes,
} from "react-router-dom";
import { TextField, Typography } from "@material-ui/core";

const font = "'Lato'";

// Custom styles
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    display: "block", 
    textAlign: "left",
    backgroundColor: "#3f1f7d",
    overflow: "hidden"
    
  },
  noBorder: {
    border: "none",
  },
}));

const Outdated = () => {
  // Declare State
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("All");
  const [origin, setOrigin] = React.useState("All");
  const [minValue, setMinValue] = React.useState("");
  const [maxValue, setMaxValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  console.log("I AM PRO FR FR")
  const [numResults, setNumResults] = React.useState(12);
  const [resultsToShow, setResultsToShow] = React.useState(searchResults.slice(0, numResults));
  const sentinelRef = React.useRef(null);

  let Rarityvalue = React.useState("");
  let Originvalue = React.useState("");


  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setNumResults((prev) => prev + 4);
          console.log("Added 10 more results")
        }
      });
    }, { threshold: 0.5 });
    if (sentinelRef.current)
      observer.observe(sentinelRef.current);

    return () => {
      observer.unobserve(sentinelRef.current);
    };
  }, [sentinelRef.current]);

  React.useEffect(() => {
    setResultsToShow(searchResults.slice(0, numResults));
  }, [searchResults, numResults]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const bottom = scrollHeight - (scrollTop + clientHeight) < 12;
    const top = scrollTop === 0;
    
    if (bottom) {
      setNumResults((prev) => prev + 4);
      console.log("Added 10 more results")
    } else if (top && numResults > 12) {
      setNumResults(12);
      console.log("Set 20 more results")
    }
  };
  

  const selectItem = (option, item, func) => {
    if (option === "Rarity") {
      func(item);
      setFilter(item.value);
    }
    if (option === "Origin") {
      func(item);
      setOrigin(item.value)
    }
  };

  function realValue(value) {
    const num = parseInt(value);
    const sub = value.toString().replace(/[0-9]/g, "").toLowerCase();
    if (sub == '') {
      return num
    }
    if (sub === "m") {
      return num * 1000000;
    }
    if (sub === "b") {
      return num * 1000000000;
    }
    if (sub === "t") {
      return num * 1000000000000;
    }
    if (sub === "q") {
      return num * 1000000000000;
    }
  }
  function performSearch() {
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTerm,
        rarity: filter,
        origin,
        min: realValue(minValue),
        max: realValue(maxValue),
      }),
    })
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
  }

  React.useEffect(() => {
    performSearch();
  }, [searchTerm, filter, origin, minValue, maxValue]);

  function intToString(value) {
    var suffixes = ["", "K", "M", "B", "T"];
    var suffixNum = Math.floor(Math.log10(value) / 3);
    var shortValue = parseFloat((value / Math.pow(1000, suffixNum)).toFixed(2));
    return shortValue + suffixes[suffixNum];
  }
 
  return (
    <>
      <Box>

      </Box>
      <Box p={{xs: 4, sm: 4, md: 8}} style={{}}>
        <Box display={`flex`} mb={4}>
          <Box display={`flex`} justifyContent={`center`} flexDirection={`column`}>
            <img
              draggable="False"
              src={homeIcon}
              alt="logo1"
              width={18}
              height={18}
            />
          </Box>
          <Link to="/" style={{textDecoration: 'none'}}>
            <Typography
              style={{
                color: "#c2c2c2",
                fontSize: "2.5vmin",
                fontFamily: font,
                padding: 4,
              }}
            >
              Home
            </Typography>
          </Link>
          <Box display={`flex`} justifyContent={`center`} flexDirection={`column`}>
            <img
              draggable="False"
              src={doubleArrow}
              alt="logo1"
              width={18}
              height={18}
            />
          </Box>
          <Typography
            style={{
              color: "#8c53ff",
              fontSize: "2.5vmin",
              fontFamily: font,
              padding: 4,
            }}
          >
            Values
          </Typography>
        </Box>
        <Box mb={6} >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography style={{
                fontSize: '42px',
                color: 'white',
              }}>
                Values
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      size='small'
                      label={searchTerm ? " " : "Search Pets"}
                      sx={{
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0, border: 'none' },
                        // "& .MuiOutlinedInput-notchedOutline"
                      }}
                      // variant="standard"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        style: {
                          color: "white",
                          fontSize: "2.2vmin",
                          border: 'none',
                        },
                        //classes: { notchedOutline: classes.noBorder },
                        // disableUnderline: true,
                        endAdornment: (
                          <img
                            draggable="False"
                            src={searchBar}
                            alt="logo1"
                          />
                        )
                      }}
                      InputLabelProps={{
                        style: {
                          color: "#D3D3D3",
                          fontFamily: font,
                          fontSize: "2.2vmin",
                          // lineHeight: "50%",
                        },
                        shrink: false,
                      }}
                      style={{
                        // backgroundColor: "#3f1e7e",
                        color: "white",
                        borderRadius: "1.5vmin",
                        boxShadow: "0px 0px 4px 4px rgba(255,255,255,0.1)",
                        
                      }}
                    />
                  </Box>    
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <Box display="flex" style={{ gap: 16 }} mb={1}>
                        <Box width={`100%`}>
                          <Dropdown
                            title="Rarity"
                            selectItem={selectItem}
                            items={[
                              { value: "All", id: 1 },
                              { value: "Titanic", id: 2 },
                              { value: "Huge", id: 3 },
                              { value: "Exclusive", id: 4 },
                              { value: "Mythical", id: 5 },
                              { value: "Hardcore", id: 6 },
                              { value: "Misc", id: 7 },
                            ]}
                          />
                        </Box>
                        <Box width={`100%`}>
                          <Dropdown
                            title="Origin"
                            fontSize="1.3vmin"
                            paddingTop="1vmin"
                            selectItem={selectItem}
                            items={[
                              { value: "All", id: 1 },
                              { value: "Doodle Update", id: 2 },
                              { value: "DLC Code", id: 3 },
                              { value: "Fantasy Update", id: 4 },
                              { value: "Tech Update", id: 5 },
                            ]}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box display="flex" style={{ gap: 16 }}  mb={1} justifyContent={`center`}>
                        <Box width={{ xs: `100%`, md: `30%` }}>
                          <TextField
                            id="outlined-basic"
                            label={minValue ? " " : "Min:"}
                            fullWidth
                            variant="outlined"
                            size="small"
                            onChange={(e) => setMinValue(e.target.value)}
                            InputProps={{
                              style: {
                                color: "white",
                                fontSize: "1.75vmin",
                              },
                              //classes: { notchedOutline: classes.noBorder },
                              disableUnderline: true,
                            }}
                            InputLabelProps={{
                              style: {
                                color: "#fff",
                                fontFamily: font,
                                fontSize: "2vmin",
                              },
                              shrink: false,
                            }}
                            style={{
                              backgroundColor: "#3f1e7e",
                              color: "white",
                              borderRadius: "1vmin",
                              boxShadow: "0px 0px 4px 4px rgba(255,255,255,0.1)",
                            }}
                          />
                        </Box>
                        <Box width={{ xs: `100%`, md: `30%` }}>
                          <TextField
                            id="outlined-basic"
                            label={maxValue ? " " : "Max:"}
                            fullWidth
                            onChange={(e) => setMaxValue(e.target.value)}
                            variant={`outlined`}
                            size='small'
                            InputProps={{
                              style: {
                                color: "white",
                                // marginTop: "0.2%",
                                // width: "83%",
                                fontSize: "1.75vmin",
                                // marginLeft: "8%"
                              },
                              //classes: { notchedOutline: classes.noBorder },
                              disableUnderline: true,
                            }}
                            InputLabelProps={{
                              style: {
                                color: "#fff",
                                fontFamily: font,
                                fontSize: "2vmin",
                                // height: "2%",
                                // marginTop: "-21%",
                                // marginLeft: "8%"
                              },
                              shrink: false,
                            }}
                            style={{
                              backgroundColor: "#3f1e7e",
                              color: "white",
                              // width: "55%",
                              
                              borderRadius: "1vmin",
                              boxShadow: "0px 0px 4px 4px rgba(255,255,255,0.1)",
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box mb={4}>
          <div
            style={{
              // width: '95%',
              // height: '63%',
              // position: 'absolute',
              // top: '37%',
              height: '50vh',
              // height: '500px',
              overflow: 'scroll',
              display: 'flex',
              display: "flex",
              padding: 8,
              borderRadius:8,
              // marginLeft: "3%",
              // overflow: 'hidden',
            }}
            onScroll={handleScroll}
            className="my-element" 
            ref={sentinelRef}
          >
            <Grid container spacing={3}>
              {resultsToShow.map((result, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Box
                    p={2}
                    key={result.Normal.Display}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#482687",
                      borderRadius: "1vmin",
                      color: "white",
                      fontFamily: font,
                      boxShadow: "0px 0px 18px 9px rgba(255,255,255,0.1)",
                      height: 176,
                    }}>
                    <Link
                      to={`/pets/${result.Normal.Search}`}
                      style={{
                        height: "100%", 
                        width: "100%", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        display: "flex",
                        textDecoration: 'none',
                      }}
                    >
                      <div style={{
                          display: "flex", 
                          // flexDirection: "column", 
                          // justifyContent: "center", 
                          color: "white",
                          gap: 16,
                        }}
                      >
                        <Box style={{ width: 96, height: 96, flex: 1, flexShrink: 0, flexGrow: 1 }}>
                          <img
                            src={result.Normal.Icon}
                            alt={`${result.Normal.Display} icon`}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </Box>
                        <Box>
                          <Textfit>
                            <Typography style={{ fontSize: 24, fontWeight: 'bold' }}>{result.Normal.Display}</Typography>
                          </Textfit>
                          
                          <Typography>Value: {intToString(result.Normal.Value)}</Typography>
                          <Typography>Demand: {result.Normal.Demand}</Typography>
                          <Typography>Rarity: {result.Normal.Rarity}</Typography>
                        </Box>
                      </div>
                    </Link>
                  </Box>
                </Grid>
              ))}
            </Grid> 
          </div>
        </Box>
      </Box>
    </>
  )
};

export default Outdated;
