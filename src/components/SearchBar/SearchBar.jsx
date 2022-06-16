import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import {
  getNewResultsFromSearch,
  myLocationSearch,
  getAddressFromLatLong,
} from "./SearchBarLogic";
import { InputUnstyled } from "@mui/base";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import { Divider, FilledInput, Input, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";

const inputStyle = {
  borderRadius: 5,
  width: "75%",
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
      <FormControl variant="outlined" fullWidth={true} sx={inputStyle}>
        <Input
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
    </InputWrapper>
  );
}
