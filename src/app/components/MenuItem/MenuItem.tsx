import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import theme from "../../../assets/theme";

export interface IMenuItem {
  text: string;
  icon?: React.ReactElement;
  to: string;
  handleClick?: any;
  selected?: boolean;
}

export default function MenuItem({
  text,
  icon,
  to,
  handleClick,
  selected = false,
}: IMenuItem) {
  return (
    <NavLink
      to={to}
      style={({ isActive, isPending }) => {
        return {
          textDecoration: "none",
          color: isActive ? theme.palette.primary.main : "black",
          fontWeight: isActive ? "bold" : "",
        };
      }}
    >
      {({ isActive }) => (
        <ListItem disablePadding>
          <ListItemButton>
            {icon && (
              <ListItemIcon
                sx={
                  isActive
                    ? {
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                      }
                    : undefined
                }
              >
                {icon}
              </ListItemIcon>
            )}
            {text}
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  );
}
