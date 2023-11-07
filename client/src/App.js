import React from "react";

import "./font.css";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import logo from "./assets/logo.png";
import home from "./views/home.jsx";
import valuespage from "./views/values.jsx";
import PetPage from "../src/views/petpage"

import { AppBar } from "./components";

import useStyles from "./App.Style";

export default function App() {
  const classes = useStyles();
  let location = useLocation();
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("All");
  const [origin, setOrigin] = React.useState("All");
  const [minValue, setMinValue] = React.useState(-Infinity);
  const [maxValue, setMaxValue] = React.useState(Infinity);


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

  React.useEffect(() => {
    performSearch();
  }, [searchTerm, filter, origin, minValue, maxValue]);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Router>
          <AppBar />
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/values" component={valuespage} />
            <Route exact path="/pets/:petname2" component={PetPage} />
            <Route exact path="/pets/" component={PetPage} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}
