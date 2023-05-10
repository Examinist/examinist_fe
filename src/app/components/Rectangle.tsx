import { styled } from "@mui/material";

export const Rectangle = styled("div")(({ theme, color }) => ({
  position: "relative",
  display: "flex",
  width: "20px",
  height: "20px",
  backgroundColor: color,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
}));
