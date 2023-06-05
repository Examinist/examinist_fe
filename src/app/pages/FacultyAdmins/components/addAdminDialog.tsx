import { useState } from "react";
import IUser from "../../../types/User";
import CustomDialog, { CustomDialogTitle } from "../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import { Box, DialogContent, Divider, List, ListItemButton, ListItemText } from "@mui/material";

interface IAdminDialogProp {
    instructors: IUser[],
    open: boolean,
    handleOpenClose: () => void,
}

export default function AddAdminDialog({ instructors, open, handleOpenClose }: IAdminDialogProp) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        handleOpenClose();
    };

    return (
        <CustomDialog
            fullWidth
            maxWidth="md"
            onClose={handleOpenClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <CustomDialogTitle onClose={handleOpenClose}>
                <Box sx={{ mx: 2, my: 1 }}>
                    Select Faculty Admin
                </Box>
            </CustomDialogTitle>
            <Divider/>
            <DialogContent sx={{ p: 3, mx: 2, my: 1, }}>
                <Box sx={{
                    color: "#969090", fontWeight: "bold", fontSize: 17
                }}>
                    Faculty instructors
                </Box>
                <List>
                    {instructors.map((value, index) =>
                    <>
                     <ListItemButton
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                        >
                            <ListItemText
                                primary={value.first_name + " " + value.last_name}
                                primaryTypographyProps={{ fontWeight: "medium", fontSize: 16 }}
                                secondary={value.username}
                                secondaryTypographyProps={{
                                    fontWeight: "medium", fontSize: 14,
                                    color: "#969090"
                                }}
                            ></ListItemText>
                        </ListItemButton>
                        {index<instructors.length-1 && <Divider/>}
                    </>
                       
                    )}
                </List>
            </DialogContent>
        </CustomDialog>
    );
} 