import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import background from "../assets/valuesbg.png";
import mbackground from "../assets/mobilebackground.png";
import star from "../assets/staricon.png";
import icon1 from "../assets/icon1.png";
import homeIcon from "../assets/home.png";
import doubleArrow from "../assets/doubleArrow.png";
import underarrow from "../assets/underarrow.png";
import searchbar from "../assets/search.png";
import Dropdown from "../modules/dropdown.jsx";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Textfit } from 'react-textfit';
import PetGraph from '../views/petgraph.jsx'

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
import { Grid, TextField, Typography } from "@material-ui/core";
import LeftCat from "../assets/HugeCatLeft.png";
import RightCat from "../assets/HugeCatRight.png";


const font = "'Lato'";


const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    display: "block",
    textAlign: "left",
    backgroundColor: "#3f1f7d",
  },
  noBorder: {
    border: "none",
  },
}));

const PetPage = (props) => {
  const petname = props.match.params.petname2;
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("All");
  const [origin, setOrigin] = React.useState("All");
  const [minValue, setMinValue] = React.useState(-Infinity);
  const [maxValue, setMaxValue] = React.useState(Infinity);
  const [searchResults, setSearchResults] = React.useState([]);
  const [petType, setPetType] = React.useState("Normal");

  function realValue(value) {
    const num = parseInt(value);
    const sub = value.toString().replace(/[0-9]/g, "");
    if (sub === "M") {
      return num * 1000000;
    }
    if (sub === "B") {
      return num * 1000000000;
    }
    if (sub === "T") {
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

  function intToString(value) {
    var suffixes = ["", "K", "M", "B", "T"];
    var suffixNum = Math.floor(Math.log10(value) / 3);
    var shortValue = parseFloat((value / Math.pow(1000, suffixNum)).toFixed(2));
    return shortValue + suffixes[suffixNum];
  }

  React.useEffect(() => {
    performSearch();
  }, [searchTerm, filter, origin, minValue, maxValue]);

  const pet = searchResults.find((result)  => result.Normal.Search === petname);
  if (searchResults.length === 0) {
    return null; // or render a loading spinner or some other placeholder
  }

  if (pet) {
    const PetName = pet.Normal.Display
    return (
      <Box p={8}>
        <Box display="flex" mb={4}>
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
          <Link to="/values" style={{ textDecoration: 'none' }}>
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
            {PetName}
          </Typography>
        </Box>
        <Box>
            <Typography style={{
              color: 'white',
              fontSize: 48,
            }}>{PetName}</Typography>
        </Box>
        <Box p={8}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} md={6}>
                <Box>                  
                  <div
                    style={{
                      backgroundColor: "#482687", 
                      color: "white", 
                      fontFamily: font, 
                      borderRadius: 12, 
                      boxShadow: "0px 0px 18px 9px rgba(150,200,255,0.15)",
                    }}>
                      <Box p={4}>
                        <Box height={200} display="flex" justifyContent={`center`}>
                          <img 
                            src={pet[petType].Icon} 
                            alt={`${pet[petType].Display} icon`}
                            height={`100%`}
                          />
                        </Box>
                        <Box style={{
                          display: 'grid',
                          // gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: 8,
                        }}
                          gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)'}}
                        >
                          {['Rarity', 'Value', 'Demand', 'Origin', 'Status'].map((value, index) => (
                            <Box key={index} mb={2}>
                              <Typography 
                                style={{
                                  color: "#c2c2c2",
                                  fontSize: 22,
                                  marginBottom: 8,
                                }}
                              >
                                {value}
                              </Typography>
                              <Typography 
                                style={{
                                  color: "white", 
                                  fontWeight: "bold",
                                  fontSize: 30,
                              }}>
                                {value === 'Value' ? intToString(pet[petType][value]) : pet[petType][value]}
                              </Typography>
                            </Box>
                          ))}
                          
                        </Box>
                      </Box>
                      <div style={{
                        backgroundColor: "#4f2897",
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: 16,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                      }}>
                        <div 
                          style={{
                            fontFamily: font, 
                            fontSize: "4vmin", 
                            color: petType === "Normal" ? "#9853ff" : "white", 
                            cursor: "pointer"
                          }} 
                          onClick={() => setPetType("Normal")}>Normal</div>
                        <div 
                          style={{
                            fontFamily: font, 
                            fontSize: "4vmin", 
                            color: petType === "Golden" ? "#9853ff" : "white", 
                            cursor: "pointer"
                          }} onClick={() => setPetType("Golden")}>Golden</div>
                        <div 
                          style={{
                            fontFamily: font, 
                            fontSize: "4vmin", 
                            color: petType === "Rainbow" ? "#9853ff" : "white", 
                            cursor: "pointer"
                          }}
                          onClick={() => setPetType("Rainbow")}
                        >
                          Rainbow
                        </div>
                    </div>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box style={{
                  boxShadow: "0px 0px 18px 9px rgba(150,200,255,0.15)",
                  borderRadius: 8,
                  height: '100%',
                }}>
                  <PetGraph pet={pet[petType]}/>
                </Box>
              </Grid>
            </Grid>
        </Box>
      </Box>
    )
  }
    
  else 
    return (
      <Box p={8}>

      </Box>
    )
    // if (pet) {
    //   console.log(pet)
    //   const PetName = pet.Normal.Display
    //   // if the pet is found, render its details
    //   return (
    //     <div className={classes.root}>
    //       <img
    //         draggable="false"
    //         src={background}
    //         alt="Logo"
    //         style={{ height: "99%", width: "100%", userSelect: "none" }}
    //       ></img>
    //       <img
    //         draggable="False"
    //         src={homeicon}
    //         alt="logo1"
    //         style={{
    //           position: "fixed",
    //           height: "2.5vmin",
    //           width: "2.5vmin",
    //           bottom: "80vmin",
    //           left: "7vmin",
    //         }}
    //       />
    //       <div style={{backgroundColor: "#482687", width: "60vmin", height: "55vmin", position: "absolute", top: "32%", right: "58%", color: "white", fontFamily: font, borderRadius: "1.5vmin", boxShadow: "0px 0px 18px 9px rgba(150,200,255,0.15)",}}>
    //         <img src={pet[petType].Icon} alt={`${pet[petType].Display} icon`} style={{marginLeft: "33%", marginTop: "3vmin", width: "20vmin"}} />
    //         <Textfit style={{width: "7.5vmin", height: "3vmin", position: "absolute", top: "30vmin", left: "5vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "#c2c2c2"}}>Rarity</Textfit>
    //         <Textfit style={{width: "14vmin", height: "4vmin", position: "absolute", top: "32.5vmin", left: "5vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "white", fontWeight: "bold"}}>{pet[petType].Rarity}</Textfit>
    //         <Textfit style={{width: "7.5vmin", height: "3vmin", position: "absolute", top: "39vmin", left: "5vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "#c2c2c2"}}>Value</Textfit>
    //         <Textfit style={{width: "14vmin", height: "4vmin", position: "absolute", top: "41.5vmin", left: "5vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "white",  fontWeight: "bold"}}>{intToString(pet[petType].Value)}</Textfit>
    //         <Textfit style={{width: "10vmin", height: "3vmin", position: "absolute", top: "39vmin", left: "26vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "#c2c2c2"}}>Demand</Textfit>
    //         <Textfit style={{width: "10vmin", height: "4vmin", position: "absolute", top: "41.5vmin", left: "26vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "white",  fontWeight: "bold"}}>{pet[petType].Demand}</Textfit>
    //         <Textfit style={{width: "8vmin", height: "3vmin", position: "absolute", top: "30vmin", left: "26vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "#c2c2c2"}}>Origin</Textfit>
    //         <Textfit style={{width: "16vmin", height: "4vmin", position: "absolute", top: "32.5vmin", left: "26vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "white",  fontWeight: "bold"}}>{pet[petType].Origin}</Textfit>
    //         <Textfit style={{width: "8vmin", height: "3vmin", position: "absolute", top: "30vmin", left: "46vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "#c2c2c2"}}>Status</Textfit>
    //         <Textfit style={{width: "14vmin", height: "4vmin", position: "absolute", top: "32.5vmin", left: "46vmin", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "white",  fontWeight: "bold"}}>{pet[petType].Status}</Textfit>
            
    //         <div style={{backgroundColor: "#4f2897", width:'100%', height: "13%", borderRadius: "1.5vmin", position: "absolute", bottom: "0vmin"}}>
    //           <div style={{fontFamily: font, fontSize: "4vmin", position: "absolute", top: "0.9vmin", left: "5vmin", color: petType === "Normal" ? "#9853ff" : "white", cursor: "pointer"}} onClick={() => setPetType("Normal")}>Normal</div>
    //           <div style={{fontFamily: font, fontSize: "4vmin", position: "absolute", top: "0.9vmin", left: "23vmin", color: petType === "Golden" ? "#9853ff" : "white", cursor: "pointer"}} onClick={() => setPetType("Golden")}>Golden</div>
    //           <div style={{fontFamily: font, fontSize: "4vmin", position: "absolute", top: "0.9vmin", left: "40vmin", color: petType === "Rainbow" ? "#9853ff" : "white", cursor: "pointer"}} onClick={() => setPetType("Rainbow")}>Rainbow</div>
    //         </div>
          
    //       </div>
    //       <div style={{backgroundColor: "#482687", width: "85vmin", height: "55vmin", position: "absolute", top: "32%", right: "13%", color: "white", fontFamily: font, borderRadius: "1.5vmin", boxShadow: "0px 0px 18px 9px rgba(150,200,255,0.15)",}}>
    //       <PetGraph pet={pet[petType]}/>
    //       </div>
          
    //       <img
    //         draggable="false"
    //         src={background}
    //         alt="Logo"
    //         style={{ height: "99%", width: "100%", userSelect: "none" }}
    //       ></img>
    //       <img
    //         draggable="False"
    //         src={homeicon}
    //         alt="logo1"
    //         style={{
    //           position: "fixed",
    //           height: "2.5vmin",
    //           width: "2.5vmin",
    //           bottom: "80vmin",
    //           left: "7vmin",
    //         }}
    //       />
    //       <Link to="/">
    //         <div
    //           style={{
    //             position: "fixed",
    //             userSelect: "none",
    //             bottom: "79.7vmin",
    //             left: "10vmin",
    //             color: "#c2c2c2",
    //             fontSize: "2.5vmin",
    //             fontFamily: font,
    //           }}
    //         >
    //           Home
    //         </div>
    //       </Link>
    //       <img
    //         draggable="False"
    //         src={doublearrow}
    //         alt="logo1"
    //         style={{
    //           position: "fixed",
    //           height: "1.65vmin",
    //           width: "1.65vmin",
    //           bottom: "80.05vmin",
    //           left: "18vmin",
    //         }}
    //       />
    //       <Link to="/values">
    //         <div
    //           style={{
    //             position: "fixed",
    //             userSelect: "none",
    //             bottom: "79.7vmin",
    //             left: "21vmin",
    //             color: "#c2c2c2",
    //             fontSize: "2.5vmin",
    //             fontFamily: font,
    //           }}
    //         >
    //           Values
    //         </div>
    //       </Link>
    //       <img
    //         draggable="False"
    //         src={doublearrow}
    //         alt="logo1"
    //         style={{
    //           position: "fixed",
    //           height: "1.65vmin",
    //           width: "1.65vmin",
    //           bottom: "80.05vmin",
    //           left: "29.5vmin",
    //         }}
    //       />
    //       <div
    //         style={{
    //           position: "fixed",
    //           userSelect: "none",
    //           bottom: "79.7vmin",
    //           left: "32.5vmin",
    //           color: "#8c53ff",
    //           fontSize: "2.5vmin",
    //           fontFamily: font,
    //         }}
    //       >
    //         {PetName}
    //       </div>
    //       <div
    //         style={{
    //           position: "fixed",
    //           userSelect: "none",
    //           bottom: "70.5vmin",
    //           left: "7.3vmin",
    //           color: "white",
    //           fontWeight: "bold",
    //           fontSize: "6vmin",
    //           fontFamily: font,
    //         }}
    //       >
    //         {pet[petType].Display}
    //       </div>

         
          
    //     </div>
    //   );
    // } else {
    //   // if the pet is not found, render a message
    //   return (
    //     <div className={classes.root}>
    //       <img
    //           draggable="false"
    //           src={background}
    //           alt="Logo"
    //           style={{ height: "99%", width: "100%", userSelect: "none" }}
    //         ></img>
    //       <div style={{color: "#9853ff", position: "absolute", fontSize: "45vmin", top: "15vmin", left: "31%", fontFamily: font}}>404</div>
    //       <div style={{color: "#9853ff", position: "absolute", fontSize: "5.5vmin", top: "63vmin", left: "28%", fontFamily: font}}>I couldn't find what you were looking for.</div>
    //       <img
    //           draggable="false"
    //           src={LeftCat}
    //           alt="LeftCat"
    //           style={{userSelect: "none", top: "85%", left: "0%", position: "absolute",}}
    //         ></img>
    //         <img
    //           draggable="false"
    //           src={RightCat}
    //           alt="RightCat"
    //           style={{userSelect: "none", top: "85%", left: "93%", position: "absolute",}}
    //         ></img>
            
    //     </div>
    //   );
    // }
};

export default PetPage;
