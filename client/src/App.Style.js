import { makeStyles } from "@material-ui/core/styles";
const font = "'Lato'";

const useStyles = makeStyles({
    root: {
      background: "#3f1f7d",
    //   display: "flex",
    //   position: "relative"
      backgroundImage: 'url("/background.png")',
      backgroundSize: '100% 100%',
      // minHeight: '900px',
    },
    content: {
    //   flexGrow: 1,
    //   height: "100vh",
    //   overflow: "auto"
    },
    navbar: {
      backgroundColor: "#311a5f",
      height: "12vmin", // changed from pixels to vh
      width: "100%",
      boxShadow: "0px 0px 40px -15px black",
      position: "fixed",
      display: "flex",
      flexDirection: "column"
    },
    valuesbutton: {
      textTransform: "none",
      height: "12vmin",
      width: "11vmin",
      color: "white",
      fontSize: "3.4vmin",
      fontFamily: font,
      fontWeight: "bold",
      userSelect: "none",
      marginTop: "-12vmin",
      lineHeight: "11.5vmin",
      marginLeft: "23vmin",
  
      "&:hover": {
        color: "#9853ff"
      }
    },
    calcbutton: {
      textTransform: "none",
      height: "12vmin",
      width: "11vmin",
      color: "white",
      fontSize: "3.4vmin",
      fontFamily: font,
      userSelect: "none",
      fontWeight: "bold",
      marginTop: "-12vmin",
      lineHeight: "11.5vmin",
      marginLeft: "37vmin",
  
      "&:hover": {
        color: "#9853ff"
      }
    },
    inforbutton: {
      textTransform: "none",
      height: "12vmin",
      userSelect: "none",
      width: "11vmin",
      color: "white",
      fontSize: "3.4vmin",
      fontFamily: font,
      fontWeight: "bold",
      marginTop: "-12vmin",
      lineHeight: "11.5vmin",
      marginLeft: "57vmin",
  
      "&:hover": {
        color: "#9853ff"
      }
    },
    discordicon: {
      textTransform: "none",
      height: "12vmin",
      width: "6.3vmin",
      color: "white",
      fontSize: "3.4vmin",
      fontFamily: font,
      fontWeight: "bold",
      marginTop: "-12vmin",
      lineHeight: "15vmin",
      marginLeft: "81%"
    },
    twittericon: {
      textTransform: "none",
      height: "12vmin",
      width: "6.3vmin",
      color: "white",
      fontSize: "3.4vmin",
      fontFamily: font,
      fontWeight: "bold",
      marginTop: "-12vmin",
      lineHeight: "14vmin",
      marginLeft: "86%"
    },
    robloxicon: {
      textTransform: "none",
      height: "12vmin",
      width: "6.3vmin",
      color: "white",
      fontSize: "3.4vmin",
      fontFamily: font,
      fontWeight: "bold",
      marginTop: "-12vmin",
      lineHeight: "14vmin",
      marginLeft: "90%"
    },
    botbutton: {
      textTransform: "none",
      height: "7vmin",
      width: "12vmin",
      userSelect: "none",
      color: "white",
      backgroundColor: "#3f1f7d",
      fontSize: "3.4vmin",
      fontFamily: font,
      fontWeight: "bold",
      marginTop: "-9vmin",
      lineHeight: "6.7vmin",
      textAlign: "center",
      marginLeft: "93.5%",
      borderRadius: "1.5vh"
    },
    logo: {
      userSelect: "none",
      width: "18vmin",
      height: "16vmin"
    },
    moblenavbar: {
      backgroundColor: "#311a5f",
      height: "15vmin", // changed from pixels to vh
      width: "100%",
      boxShadow: "0px 0px 40px -15px black",
      position: "fixed",
      display: "flex",
      flexDirection: "column"
    },
    mobilelogo: {
      userSelect: "none",
      width: "20t vmin",
      height: "18vmin"
    }
});
  
export default useStyles;
