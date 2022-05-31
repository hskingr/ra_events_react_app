import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getNewResultsFromSearch, myLocationSearch } from "./SearchBarLogic";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarContainer = styled.div`
  width: 100%;
  display: "flex";
  alignitems: "center";
  justifycontent: "center";
  z-index: 999;
`;

export default function SearchBar({ receivedLocationForProcessing }) {
  const [searchQuery, setSearchQuery] = useState("");

  async function myLocationButtonPressed() {
    // expect to return the location of the user
    const location = await myLocationSearch();
    receivedLocationForProcessing(location);
  }

  async function searchQueryButtonPressed(query) {
    // expect to return the location of the query
    const location = await getNewResultsFromSearch(query);
    receivedLocationForProcessing(location);
  }

  return (
    <>
      <SearchBarContainer>
        {/* <button onClick={() => sendSearchQuery(location)}> Get Location</button> */}
        <button onClick={() => myLocationButtonPressed()}>
          {" "}
          Use My Location
        </button>
        <input onChange={(event) => setSearchQuery(event.target.value)} />
        <button onClick={() => searchQueryButtonPressed(searchQuery)}>
          search{" "}
        </button>
      </SearchBarContainer>

      <form>
        <TextField
          id="search-bar"
          className="text"
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search..."
          size="small"
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </form>
    </>
  );
}
