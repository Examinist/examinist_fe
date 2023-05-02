import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TemplateElement from "./TemplateElement";
import ConfirmIcons from "../../Topics/components/ConfirmIcons";
import { ITypeList } from "../Template";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ITemplateCardProps {
    title: string;
    listMap: any[];
    colors: string[];
}

export interface IFormInput {
    list: ITypeList[];
}

const schema = yup.object().shape({
    list: yup.array().of(
        yup.object().shape({
            name: yup.string(),
            percent: yup.number().required(),
        })
    )
})

export default function TemplateCard({ title, listMap, colors }: ITemplateCardProps) {
    const [edit, setEdit] = useState(false);

    const methods = useForm<IFormInput>({
        defaultValues: {
            list: listMap
        },
        resolver: yupResolver(schema),
    });

    const { control, handleSubmit } = methods;

    const { fields } = useFieldArray({
        control,
        name: "list",
    });

    const onSubmit = (data: IFormInput) => {
        console.log(data);
        setEdit(!edit);
    };


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        mb: 4,
                        px :2,
                        bgcolor: "White",
                        borderRadius: "15px",
                        py: 1,
                    }}
                >
                    <ListItem
                        secondaryAction={
                            edit ? <ConfirmIcons
                                isSubmit={true}
                                cancelHandler={() => setEdit(!edit)}
                                confirmChange={() => {}}/> :
                                <IconButton
                                    onClick={() => setEdit(!edit)
                                    }
                                >
                                    <EditIcon />
                                </IconButton>
                        }>
                        <Typography
                            sx={{
                                fontSize: "23px",
                            }}
                        >
                            {title}
                        </Typography>
                    </ListItem>
                    <List disablePadding>
                        {fields.map((item, index) => (
                            <div key={item.id}>
                                {title === "Question Types" ?
                                    <TemplateElement
                                        showIcon={false}
                                        //difficulty={item}
                                        index={index}
                                        editPercent={edit}
                                        difficultyColor={""}></TemplateElement>
                                    : <TemplateElement
                                        showIcon={true}
                                        //difficulty={item}
                                        index={index}
                                        editPercent={edit}
                                        difficultyColor={colors[index]}></TemplateElement>

                                }
                            </div>
                        )
                        )}
                    </List>
                </Box>
            </form>
        </FormProvider>
    );
}