import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import theme from "../../../../assets/theme";

export interface IMenuItem {
  text: string;
  icon?: React.ReactElement;
  to: string;
  handleClick?: any;
  selected?: boolean;
}

export default function MenuItem({ text, icon, to, handleClick, selected = false }: IMenuItem) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NavLink}
        to={to}
        onClick={() => handleClick(to)}
      >
        {icon ? (
          <ListItemIcon
            sx={
              selected
                ? { color: theme.palette.primary.main, fontWeight: "bold" }
                : {}
            }
          >
            {icon}
          </ListItemIcon>
        ) : null}
        <ListItemText
          className={selected ? "selected" : ""}
          primary={
            <Box
              sx={
                selected
                  ? { color: theme.palette.primary.main, fontWeight: "bold" }
                  : {}
              }
            >
              {text}
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
