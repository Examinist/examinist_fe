import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TemplateElement from "./TemplateElement";
import ConfirmIcons from "../../Topics/components/ConfirmIcons";

interface ITemplateCardProps {
    title: string;
    listMap: any[];
    colors: string[];
}

export default function TemplateCard({ title, listMap, colors }: ITemplateCardProps) {
    const [edit, setEdit] = useState(false);
    return (
        <Box
            sx={{
                marginTop: "10px",
                marginLeft: "20px",
                bgcolor: "White",
                borderRadius: "15px",
                paddingBottom: "8px",
            }}
        >
            <ListItem
                secondaryAction={
                    edit ? <ConfirmIcons
                        cancelHandler={() => setEdit(!edit)}
                        confirmChange={() => null}></ConfirmIcons> :
                        <IconButton
                            onClick={() => setEdit(!edit)
                            }
                        >
                            <EditIcon />
                        </IconButton>
                }>
                <Typography
                    sx={{
                        //marginLeft: "10px",
                        //paddingTop: "8px",
                        fontSize: "23px",
                    }}
                >
                    {title}
                </Typography>
            </ListItem>
            <List disablePadding>
                {listMap.map((value, index) => {
                    if (title === "Question Types") {
                        return (
                            <TemplateElement
                                showIcon={false}
                                difficulty={value}
                                editPercent={edit}
                                difficultyColor={""}></TemplateElement>
                        );
                    } else {
                        return (
                            <TemplateElement
                                showIcon={true}
                                difficulty={value}
                                editPercent={edit}
                                difficultyColor={colors[index]}></TemplateElement>
                        );
                    }
                })}
            </List>
        </Box>
    );
}