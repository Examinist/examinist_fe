import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IUser, { UserRoleEnum } from "../../../types/User";
import { mockInstructor } from "../../../services/APIs/mockData/MockData";
import { Delete } from "@mui/icons-material";
import theme from "../../../../assets/theme";

interface IAdminAccordionProp {
  faculty: string,
  admins: IUser[],
}

export default function AdminAccordion({ faculty, admins }: IAdminAccordionProp) {

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        py: 1,
        px: 3,
        borderRadius: 5,
        marginBottom: 3,
      }}
    >
      <Accordion elevation={0}>
        <AccordionSummary
          sx={{ mr: 3 }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              fontSize: 20,
              fontWeight: "medium",
            }}
          >
            Faculty of {faculty}
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ mr: 4 }}>
          <Box>
            <List disablePadding>
              {admins.map((value, index) => (
                <div key={value.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton>
                        <Delete
                          sx={{ color: "#000000" }}></Delete>
                      </IconButton>
                    }>
                    <ListItemText primary={value.first_name + " " + value.last_name}
                      primaryTypographyProps={{ fontWeight: "medium", fontSize: 18 }}
                      secondary={value.username}
                      secondaryTypographyProps={{ fontWeight: "medium", fontSize: 15, color: "#969090" }}></ListItemText>
                  </ListItem>
                  {index != admins.length - 1 && <Divider />}
                </div>
              ))}
            </List>
            <Box display="flex"
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                onClick={() => null //handleAddTopicButton(1)
                }
                sx={{
                  color: "#1B84BF",
                  backgroundColor: theme.palette.white.main,
                  width: "15%",
                  marginTop: "7px",
                  border: 1,
                  fontSize: "15px",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "15px",
                  py: 1.5,
                  height: "40px"
                }}
              >
                Add User
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}