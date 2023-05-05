import {
  Box,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { SquareRounded } from "@mui/icons-material";
import { IItem } from "../Template";
import { useFormContext } from "react-hook-form";
import { IFormInput } from "./TemplateCard";

interface ITemplateElementProps {
  //difficulty: ITypeList;
  index: number;
  editPercent: boolean;
  showIcon: boolean;
  difficultyColor: string;
}

export default function TemplateElement({
  index,
  editPercent,
  showIcon,
  difficultyColor,
}: ITemplateElementProps) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<IFormInput>();

  return (
    <Box>
      <Divider sx={{ color: "#D9D9D9" }}></Divider>
      <ListItem
        sx={{
          paddingBottom: "5px",
          paddingTop: "5px",
        }}
      >
        {showIcon ? (
          <ListItemIcon sx={{ minWidth: "30px", marginLeft: "2px" }}>
            <SquareRounded
              fontSize="medium"
              sx={{
                color: difficultyColor,
              }}
            ></SquareRounded>
          </ListItemIcon>
        ) : (
          <></>
        )}
        <Grid container sx={{ marginLeft: "2px" }}>
          <Grid item xs={3}>
            <ListItemText
              primary={getValues(`list.${index}.name`)}
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
                type="number"
                //onKeyDown={(event) => handleDiffChange(event, index)}
                placeholder="%"
                {...register(`list.${index}.percent`, {
                  valueAsNumber: true,
                })}
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
                error={errors?.list?.[index]?.percent?.message ? true : false}
              ></TextField>
            ) : (
              <ListItemText
                primary={getValues(`list.${index}.percent`)}
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
