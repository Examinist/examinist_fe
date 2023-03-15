import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import theme from "../../../assets/theme";

export interface IListItem {
  text: string;
  icon?: React.ReactElement;
  to: string;
}

export default function CustomListItem({ text, icon, to }: IListItem) {
  const nonActiveColor = theme.palette.gray.dark;
  const activeColor = theme.palette.primary.main;

  return (
    <NavLink
      to={to}
      style={({ isActive }) => {
        return {
          textDecoration: "none",
          color: isActive ? activeColor : nonActiveColor,
        };
      }}
    >
      {({ isActive }) => (
        <ListItem disablePadding>
          <ListItemButton>
            {icon && (
              <ListItemIcon sx={{ color: isActive ? activeColor : "" }}>
                {icon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={
                <Box sx={{ fontWeight: isActive ? "bold" : "" }}>{text}</Box>
              }
            />
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  );
}
