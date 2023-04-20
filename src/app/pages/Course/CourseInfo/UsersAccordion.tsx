import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid } from "@mui/material";
import UsersTable from "./UsersTable";
import IUser from "../../../types/User";


interface IUsersAccordian {
  users: IUser[];
  title: string;
}
export default function UsersAccordion({ title, users }: IUsersAccordian) {
  return (
    <Box sx={{ backgroundColor: "white", py: 1, pl: 3, borderRadius: 5 }}>
      <Accordion elevation={0}>
        <AccordionSummary
          sx={{ mr: 3 }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              fontSize: 18,
              fontWeight: "medium",
            }}
          >
            {title + " (" + users.length + ")"}
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ mr: 4 }}>
          <UsersTable users={users}></UsersTable>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
