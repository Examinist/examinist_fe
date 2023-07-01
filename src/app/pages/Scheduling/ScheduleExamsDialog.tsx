import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { IDetailedSchedule } from "../../types/Schedule";
import ScheduleReviewTable from "./ScheduleTables/ScheduleReviewTable";
import theme from "../../../assets/theme";
import ScheduleEditTable from "./ScheduleTables/ScheduleEditTable";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IScheduleFormInput, mapToExam, mapToScheduleForm, schema } from "./CreateSchedule/Step2/Fields";
import { yupResolver } from "@hookform/resolvers/yup";

interface IScheduleDialogProps {
    schedule: IDetailedSchedule,
    open: boolean,
    setOpen: (input: boolean) => void,
    setChosen: (choice: number) => void,
}

export default function ScheduleExamsDialog({ schedule, open, setOpen, setChosen }: IScheduleDialogProps) {
    const [edit, setEdit] = React.useState(false);

    const handleClose = () => {
        setOpen(false)
        setChosen(0)
        setEdit(false)
    }

    const methods = useForm<IScheduleFormInput>({
        defaultValues: {
            list: mapToScheduleForm(schedule.exams),
        },
        resolver: yupResolver(schema)
    });
    
    const { handleSubmit } = methods;
    const onSubmit = (input: IScheduleFormInput) => {
        console.log(input)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <Dialog
                    maxWidth="lg"
                    open={open}
                    onClose={handleClose}>
                    {edit ?
                        <DialogTitle>
                            <Typography color="#1B84BF" fontSize="15px" fontWeight="medium">Title</Typography>
                            <TextField value={schedule.title}
                                size="medium"
                                variant="standard"
                                fullWidth
                                sx={{ fontSize: "22px" }}></TextField>
                        </DialogTitle> : <DialogTitle>{schedule.title}</DialogTitle>}
                    <DialogContent>
                        {!edit ?
                            <>
                                <ScheduleReviewTable examList={schedule.exams}></ScheduleReviewTable>
                                <Box display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end">
                                    <Button sx={{
                                        color: "#FF4B4B",
                                        backgroundColor: theme.palette.white.main,
                                        border: 1,
                                        alignSelf: "center",
                                        borderRadius: "10px",
                                        width: "90px",
                                        fontWeight: "600",
                                        marginRight: "15px"
                                    }}>Delete</Button>
                                    <Button sx={{
                                        backgroundColor: theme.palette.white.main,
                                        border: 1,
                                        alignSelf: "center",
                                        borderRadius: "10px",
                                        width: "90px",
                                        fontWeight: "600"
                                    }}
                                        onClick={() => setEdit(true)}>Edit</Button>
                                </Box></>
                            :
                            <>
                                <ScheduleEditTable examList={schedule.exams}></ScheduleEditTable>
                                <Box display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end">
                                    <Button sx={{
                                        backgroundColor: theme.palette.white.main,
                                        border: 1,
                                        alignSelf: "center",
                                        borderRadius: "10px",
                                        width: "170px",
                                        fontWeight: "600"
                                    }}
                                        onClick={() => setEdit(false)}>Save Changes</Button>
                                </Box>
                            </>
                        }
                    </DialogContent>
                </Dialog>
            </FormProvider>
        </form>
    )
}