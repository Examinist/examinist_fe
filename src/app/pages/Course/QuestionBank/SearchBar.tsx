import { Divider, Grid, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ISearchBarProps {
  onSearch: (search: string) => void;
  onCancel: () => void;
}
export default function SearchBar({ onSearch, onCancel }: ISearchBarProps) {
  const [search, setSearch] = useState("");
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
      alignItems: "center",
      
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Header"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
     {search !== '' && <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="close"
        onClick={() => {setSearch(''); onCancel();}}
      >
        <CloseIcon />
      </IconButton>}

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <IconButton
        color="primary"
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => onSearch(search)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
