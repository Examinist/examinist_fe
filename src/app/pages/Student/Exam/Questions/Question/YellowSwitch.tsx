import styled from "@emotion/styled";
import { Switch, alpha } from "@mui/material";
import { yellow } from "@mui/material/colors";

export const YellowSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: yellow[600],
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: yellow[600],
  },
}));
