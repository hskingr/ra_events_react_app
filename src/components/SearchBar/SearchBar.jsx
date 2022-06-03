import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getNewResultsFromSearch,
  myLocationSearch,
  getAddressFromLatLong,
} from "./SearchBarLogic";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import { Divider, FilledInput, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";

const inputStyle = {
  borderRadius: 5,
  mt: 2,
  mb: 1,
};

export default function SearchBar({ receivedLocationForProcessing }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [gpsLocaterLoading, setGpsLocaterLoading] = useState(false);
  const [gpsLocaterTextResult, setGpsLocaterTextResult] = useState("");

  async function myLocationButtonPressed() {
    // expect to return the location of the user
    document.querySelector("#search-bar").value = "";
    await setGpsLocaterLoading(true);
    setGpsLocaterTextResult("Loading...");
    const location = await myLocationSearch();
    await receivedLocationForProcessing(location);
    await setGpsLocaterTextResult(await getAddressFromLatLong(location));
    await setGpsLocaterLoading(false);
    document.querySelector("#search-bar").value = gpsLocaterTextResult;
  }

  async function searchQueryButtonPressed(query) {
    // expect to return the location of the query
    const location = await getNewResultsFromSearch(query);
    receivedLocationForProcessing(location);
  }

  return (
    <>
      <FormControl variant="outlined" fullWidth={true} sx={inputStyle}>
        <OutlinedInput
          id="search-bar"
          className="text"
          onInput={(event) => setSearchQuery(event.target.value)}
          placeholder={gpsLocaterLoading === true ? "Loading..." : null}
          defaultValue={gpsLocaterTextResult}
          size="small"
          fullWidth={true}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => myLocationButtonPressed()}>
                <MyLocationIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton onClick={() => searchQueryButtonPressed(searchQuery)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}
