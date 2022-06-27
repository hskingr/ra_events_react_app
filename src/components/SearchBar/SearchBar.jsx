import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import {
  getNewResultsFromSearch,
  myLocationSearch,
  getAddressFromLatLong,
} from "./SearchBarLogic";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { InputUnstyled } from "@mui/base";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import InputAdornment from "@mui/material/InputAdornment";
import { Input } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const formControlStyle = {
  borderRadius: 5,
  width: "90%",
};

const DateTextField = styled(TextField)({
  "& .MuiInputBase-root .MuiOutlinedInput-root .MuiOutlinedInput-input": {
    borderStyle: "none",
    borderWidth: "0",
    padding: 0,
    boxSizing: "content-box",
    borderRadius: "25px",
  },
});

const InputWrapper = styled(Box)`
  display: flex;
  margin-top: 1em;
`;

const inputStyle = {
  border: "1.5px solid rgba(0, 0, 0, 0)",
  borderRadius: "10px",
  backgroundColor: "white",
  padding: "5px",
  "& .MuiInput-input": {},
};

export default function SearchBar({ receivedLocationForProcessing }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [gpsLocaterLoading, setGpsLocaterLoading] = useState(false);
  const [gpsLocaterTextResult, setGpsLocaterTextResult] = useState("");
  const [dateValue, setDateValue] = React.useState(new Date());

  async function myLocationButtonPressed() {
    // expect to return the location of the user
    document.querySelector("#search-bar").value = "";
    await setGpsLocaterLoading(true);
    setGpsLocaterTextResult("Loading...");
    const location = await myLocationSearch();
    await receivedLocationForProcessing(location, dateValue);
    await setGpsLocaterTextResult(await getAddressFromLatLong(location));
    await setGpsLocaterLoading(false);
    document.querySelector("#search-bar").value = gpsLocaterTextResult;
  }

  function checkIfEnterIsPressed(event, query) {
    if (event.key === "Enter") {
      searchQueryButtonPressed(query);
    }
  }

  async function searchQueryButtonPressed(query) {
    // expect to return the location of the query
    const location = await getNewResultsFromSearch(query);
    receivedLocationForProcessing(location, dateValue);
  }

  function handleDateChange() {
    console.log("date changed");
  }

  return (
    <InputWrapper>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          inputFormat="MM/dd/yyyy"
          value={dateValue}
          onChange={(newValue) => {
            setDateValue(newValue);
          }}
          renderInput={(params) => (
            <DateTextField
              fullWidth={true}
              size="small"
              variant="standard"
              sx={{ width: "25%", ml: 0.5 }}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
      <FormControl variant="outlined" fullWidth={true} sx={formControlStyle}>
        <Input
          id="search-bar"
          className="text"
          onInput={(event) => setSearchQuery(event.target.value)}
          placeholder={gpsLocaterLoading === true ? "Loading..." : null}
          defaultValue={gpsLocaterTextResult}
          size="small"
          disableUnderline="true"
          fullWidth={true}
          sx={inputStyle}
          onKeyDown={(event) => checkIfEnterIsPressed(event, searchQuery)}
          startAdornment={
            <InputAdornment position="end">
              <IconButton
                color="secondary"
                sx={{ m: 0, p: 0 }}
                onClick={() => searchQueryButtonPressed(searchQuery)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <IconButton
        color="secondary"
        sx={{
          // width: "10%",
          ml: 1,
          "&": {
            border: "1.5px solid rgba(0, 0, 0, 0)",
            backgroundColor: "white",
            borderRadius: "10px",
          },
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={() => myLocationButtonPressed()}
      >
        <MyLocationIcon />
      </IconButton>
    </InputWrapper>
  );
}
