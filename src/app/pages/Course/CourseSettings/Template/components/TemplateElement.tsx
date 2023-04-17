import { Box, Divider, Grid, IconButton, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { SquareRounded } from "@mui/icons-material";
import { ITypeList } from "../Template";

interface ITemplateElementProps{
    difficulty: ITypeList;
    editPercent: boolean;
    showIcon: boolean;
    difficultyColor: string;
}

export default function TemplateElement({difficulty, editPercent, showIcon, difficultyColor} : ITemplateElementProps){
    return(
        <Box>
                <Divider sx={{ color: "#D9D9D9" }}></Divider>
                <ListItem
                  sx={{
                    paddingBottom: "5px",
                    paddingTop: "5px",
                  }}
                >
                  {showIcon ? <ListItemIcon sx={{ minWidth: "30px", marginLeft: "2px" }}>
                    <SquareRounded
                      fontSize="medium"
                      sx={{
                        color: difficultyColor,
                      }}
                    ></SquareRounded>
                  </ListItemIcon> : <></>}
                  <Grid container sx={{ marginLeft: "2px" }}>
                    <Grid item xs={3}>
                      <ListItemText
                        primary={difficulty.name}
                        sx={{
                          color: "#6B6767",
                          width: "100%",
                          fontSize: "15px",
                          textTransform: "none",
                        }}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={3}>
                      {editPercent ? (
                        <TextField
                          //onKeyDown={(event) => handleDiffChange(event, index)}
                          placeholder="%"
                          value={difficulty.percent}
                          InputProps={{
                            sx: {
                              height: "30px",
                              "& input": { textAlign: "right" },
                            },
                          }}
                          sx={{
                            bgcolor: "#F5F5F5",
                            borderColor: "#D9D9D9",
                            width: "100%",
                            marginTop: "2px",
                          }}
                        ></TextField>
                      ) : (
                        <ListItemText
                          primary={difficulty.percent}
                          sx={{
                            color: "#6B6767",
                            width: "100%",
                            fontSize: "15px",
                            textTransform: "none",
                          }}
                        ></ListItemText>
                      )}
                    </Grid>
                  </Grid>
                </ListItem>
              </Box>
    );
}